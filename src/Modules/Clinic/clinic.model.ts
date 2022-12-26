import Doctor from "../Doctor/doctor.model";
import { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
import Specialization from "../Specialization/specialization.model";
import { TimestampedModel } from "../Shared/TimestampedModel";
export default class Clinic extends TimestampedModel {
static tableName= 'clinic';

//Tabel columns
id! : string
name! : string
location!:string|null
description!:string|null


    
static jsonSchema = {
    type: 'object',
    required: [ 'name' ],
    properties: {
        name: { type: 'string', minLength: 3 }
    }
}


        /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
        static relationMappings = () => ({
            doctors: {
                relation: Model.ManyToManyRelation,
                modelClass: Doctor,
                join: {
                    from: 'clinic.id',
                    through: {
                        from: 'work_time.clinic_id',
                        to: 'work_time.doctor_id'
                    },
                    to: 'doctors.id'
                }
            },
            specialization: {
                relation: Model.ManyToManyRelation,
                modelClass: Specialization,
                join: {
                    from: 'clinic.id',
                    through: {
                        from: 'clsp.clinic_id',
                        to: 'clsp.spec_id'
                    },
                    to: 'specialization.id'
                }
            }
        })
       
}