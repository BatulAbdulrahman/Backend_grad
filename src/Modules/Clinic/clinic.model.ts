import Doctor from "../Doctor/doctor.model";
import { Model, QueryBuilderType, QueryContext } from "objection";

import { DOMAIN }                                          from "../../config"
import Specialization from "../Specialization/specialization.model";
export default class Clinic extends Model {
static tableName= 'clinic';

//Tabel columns
id! : string
name! : string
location!:string|null
description!:string|null
created_at!: Date | string
updated_at!: Date | string


    
    async $beforeUpdate(args: any, qc: QueryContext) {
        this.updated_at = new Date()

        return super.$beforeUpdate(args, qc)
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
                    from: 'clinics.id',
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
                    from: 'clinics.id',
                    through: {
                        from: 'clsp.clinic_id',
                        to: 'clsp.spec_id'
                    },
                    to: 'specialization.id'
                }
            }
        })
       
}