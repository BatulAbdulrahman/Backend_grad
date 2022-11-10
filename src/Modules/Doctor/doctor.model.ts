import { Model, QueryBuilderType, QueryContext } from "objection";

export default class Doctor extends Model {
static tableName: 'doctors';

//Tabel columns
id! : string
name! : string
phone!:string|null
email!:string
password!:string|null
sex!:string|null
description!:string|null
rating!:string|null
//roles!: Role[] | string[] | []
img!: string | null
thumb!: string | null
is_disabled!: boolean
    created_at!: Date | string
    updated_at!: Date | string


    
    async $beforeUpdate(args: any, qc: QueryContext) {
        this.updated_at = new Date()

        return super.$beforeUpdate(args, qc)
    }

    static relationMappings = () => ({
        clinics: {
            relation: Model.ManyToManyRelation,
            modelClass: Doctor, //Clinic,
            join: {
                from: 'doctors.id',
                through: {
                    from: 'work_time.doctor_id',
                    to: 'work_time.clinic_id'
                },
                to: 'clinic.id'
            },
            filter: (qb: QueryBuilderType<Doctor>) => qb.select('clinic.id', 'clinic.name')
        },
    })
}