
import Clinic from "../Clinic/clinic.model";
import { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
export default class Specialization extends Model {
static tableName = 'specialization';

//Tabel columns
id! : string
name! : string
created_at!: Date | string
updated_at!: Date | string


    
    async $beforeUpdate(args: any, qc: QueryContext) {
        this.updated_at = new Date()

        return super.$beforeUpdate(args, qc)
    }
    /*static relationMappings = {
        doctors: {
          relation: Model.BelongsToOneRelation,
          modelClass: Doctor,//specialization
          join: {
            from: 'doctors.id',
            to: 'specialization.id'
          }
        }
      };*/
    static relationMappings = () => ({
        clinics: {
            relation: Model.ManyToManyRelation,
            modelClass: Clinic, //Clinic,
            join: {
                from: 'doctors.id',
                through: {
                    from: 'work_time.doctor_id',
                    to: 'work_time.clinic_id'
                },
                to: 'clinic.id'
            },
            filter: (qb: QueryBuilderType<Clinic>) => qb.select('clinic.id', 'clinic.name')
        },
    })
}