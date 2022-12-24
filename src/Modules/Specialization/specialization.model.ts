
import Clinic from "../Clinic/clinic.model";
import { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
import Doctor from "../Doctor/doctor.model";
import { TimestampedModel } from "../Shared/TimestampedModel";
export default class Specialization extends TimestampedModel {
static tableName = 'specialization';

//Tabel columns
id! : string
name! : string


   
    static relationMappings = () => ({
        clinics: {
            relation: Model.ManyToManyRelation,
            modelClass: Clinic, //Clinic,
            join: {
                from: 'specialization.id',
                through: {
                    from: 'clsp.spec_id',
                    to: 'clsp.clinic_id'
                },
                to: 'clinic.id'
            },
            filter: (qb: QueryBuilderType<Clinic>) => qb.select('clinic.id', 'clinic.name')
        },
        doctors: {
            relation: Model.ManyToManyRelation,
            modelClass: Doctor,
            join: {
                from: 'specialization.id',
                through: {
                    from: 'spec_doc.spec_id',
                    to: 'spec_doc.doctor_id'
                },
                to: 'doctors.id'
            }
        },
      
       
    })
}