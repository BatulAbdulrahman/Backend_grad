import { NextFunction, Request, Response } from "express"
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import { UtilDatabase } from "../../Utils/finder"
import Doctor                               from './doctor.model'
import { unlink }                          from 'node:fs/promises';

export const DoctorDoctorController = {

   
    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const {spec_info ,clinic_info, ...data} = req.body // anyting have a multi operation we put in transaction
 const trx = await Doctor.startTransaction()
        await Doctor
            .query(trx)
            .patchAndFetchById(req.params.id, data) // .patchAndFetchById(req.params.id, {name : })
            .throwIfNotFound({ message: 'Doctor not found!' })
            .then(async(result: Doctor) => 
            {
clinic_info.doctor_id =result.id
//spec_info.doctor_id =result.id
//remove old relations
await result.$relatedQuery("clinics",trx).unrelate()
//add new relations
await result.$relatedQuery("clinics",trx).relate(clinic_info)
//remove old relations
await result.$relatedQuery("Specializations",trx).unrelate()
//add new relations
await result.$relatedQuery("Specializations",trx).relate(spec_info)
//commit transaction
await trx.commit()
//get updated doctor
await Doctor
.query()
.findById(result.id)
.withGraphFetched("[clinics,Specializations]")// eggerloading
.then((doc: Doctor | undefined)=>res.json(doc))
                res.json(result)
            }
           )
            .catch(async err => {
                //rollback transaction
                await trx.rollback()
                return next(err)
            })
    },

}
