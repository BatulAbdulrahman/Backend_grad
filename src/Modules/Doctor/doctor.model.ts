
import Clinic from "../Clinic/clinic.model";
import { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
import Specialization from "../Specialization/specialization.model";
export default class Doctor extends Model {
static tableName = 'doctors';

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
        Specializations: {
          relation: Model.ManyToManyRelation,
          modelClass: Specialization, //Clinic,
          join: {
              from: 'doctors.id',
              through: {
                  from: 'spec_doc.doctor_id',
                  to: 'spec_doc.spec_id'
              },
              to: 'specialization.id'
          },
          filter: (qb: QueryBuilderType<Specialization>) => qb.select('specialization.id', 'specialization.name')
      },
        
    })
}