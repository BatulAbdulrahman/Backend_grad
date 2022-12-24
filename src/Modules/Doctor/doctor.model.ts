
import Clinic from "../Clinic/clinic.model";
import Objection, { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
import Specialization from "../Specialization/specialization.model";
import { TimestampedModel } from "../Shared/TimestampedModel";
export default class Doctor extends TimestampedModel {
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
                    to: 'work_time.clinic_id',
                    extra: [ 'day', 'time' ]
                },
                to: 'clinic.id'
            },
            filter: (qb: QueryBuilderType<Clinic>) => qb.select(
                'clinic.id',
                 'clinic.name',
                 'work_time.day',
            'work_time.time', )
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
    /*
     * ---------------------------------------------------------------------
     * Query modifiers
     * ---------------------------------------------------------------------
     */
    static modifiers = {
        enabled(query: QueryBuilderType<Doctor>) {
            query.where('doctors.is_disabled', false)
        }
    }
}