
import Clinic from "../Clinic/clinic.model";
import Objection, { Model, QueryBuilderType, QueryContext, Transaction } from "objection";

import { DOMAIN }                                          from "../../config"
import Specialization from "../Specialization/specialization.model";
import { TimestampedModel } from "../Shared/TimestampedModel";
import { Review } from "../../Modules/Reviews/review.model";
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
//rating!:string|null
//roles!: Role[] | string[] | []
img!: string | null
thumb!: string | null
is_disabled!: boolean

rating!: number

 
reviews?: Review[] | []

    static jsonSchema = {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            name: { type: 'string', minLength: 3 },
            description: { type: 'string', minLength: 10 }
        }
    }
    async $recalculateAvg(trx: Transaction) {
        let rating = await this
            .$relatedQuery("reviews", trx)
            .sum("rate")
            .count("id")
            .then((result: any) => {
                return result[0].sum / result[0].count
            })
        console.log("avg_rating", rating)
        await this.$query(trx).patch({ rating })
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
      reviews: {
        relation: Model.ManyToManyRelation,
        modelClass: Review,
        join: {
            from: 'doctors.id',
            through: {
                from: 'doctor_reviews.doctor_id',
                to: 'doctor_reviews.review_id'
            },
            to: 'reviews.id'
        }
    }
      /*roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
            from: 'doctors.id',
            through: {
                from: 'doctor_roles.doctor_id',
                to: 'docctor_roles.role_id'
            },
            to: 'roles.id'
        }
    },*/
        
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