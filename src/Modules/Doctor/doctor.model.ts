
import Clinic from "../Clinic/clinic.model";
import Objection, { Model, QueryBuilderType, QueryContext } from "objection";

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

    static jsonSchema = {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            name: { type: 'string', minLength: 3 },
            description: { type: 'string', minLength: 10 }
        }
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
      // Formats img and thumb fields when existing model value returns from database
    $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
        json       = super.$parseDatabaseJson(json);
        json.img   = json.img != null ? `${DOMAIN}/uploads/doctors/${json.img}` : null
        json.thumb = json.thumb != null ? `${DOMAIN}/uploads/doctors/thumbs/${json.thumb}` : null
        return json
    }
   
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