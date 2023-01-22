import { NextFunction, Request, Response } from "express"
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import { UtilDatabase } from "../../Utils/finder"
import Doctor                               from './doctor.model'
import { unlink }                          from 'node:fs/promises';

export const AdminDoctorController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

    let sorts = req.query.sorts as string
    
    let query = Doctor.query()
    .withGraphFetched(`[
        clinics,
        Specializations,
        ]`
      )
    //.orderBy(sorts!)
    return await UtilDatabase
    .finder(Doctor, req.query , query)
    .then((resules)=>res.json(resules))
    .catch(err => next(err))
    },
    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Doctor
            .query()
            .findById(id)
            .withGraphFetched(`[
                clinics,
                Specializations
            ]`)
            .throwIfNotFound({ message: 'Doctor not found!' })
            .then((result: Doctor) => res.json(result))
            .catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {

        const {spec_info ,clinic_info, ...data} = req.body // anyting have a multi operation we put in transaction
 const trx = await Doctor.startTransaction()
const img = req.file

console.log(img)
try{
      // store file

      if (img) {
        data.img = img.filename
    }
        await Doctor
            .query()
            .insert(data)
            .then(async(/*result*/result: Doctor) =>  {
                clinic_info.doctor_id =result.id
                spec_info.doctor_id =result.id
                //remove old relations
                await result.$relatedQuery("clinics",trx).unrelate()
                //add new relations
                await result.$relatedQuery("clinics",trx).relate(clinic_info)
                //remove old relations
                await result.$relatedQuery("Specializations",trx).unrelate()
                //add new relations
                await result.$relatedQuery("Specializations",trx).relate(spec_info)
                //commit transaction
                await trx.commit().then(async()=>{
 //get updated doctor
 await Doctor
 .query()
 .findById(result.id)
 .withGraphFetched("[clinics,Specializations]")
 .then((doc: Doctor | undefined)=>res.json(doc))
                })
               
                            //    res.json(result)
                            }
                           )
                        }catch(err) {
                            if (img) {
                                const img_path = path.resolve(UPLOADS_PATH, 'doctors', img.filename)
                                await unlink(img_path);
                
                                console.log(`successfully deleted ${ img_path }`);
                            }    
                                //rollback transaction
                                await trx.rollback()
                                return next(err)
                            }
                
           /*     await result.$relatedQuery("clinics").relate([1,2,3])
                res.json(result)})
            .catch(err => next(err))*/

    },

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
await trx.commit().then(async()=>{
    await Doctor
    .query()
    .findById(result.id)
    .withGraphFetched("[clinics,Specializations]")// eggerloading
    .then((doc: Doctor | undefined)=>res.json(doc))
})
//get updated doctor

            }
           )
            .catch(async err => {
                //rollback transaction
                await trx.rollback()
                return next(err)
            })
    },

    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model , like a delete
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Doctor
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Doctor not found!' })
            .returning('*')
            .then((result) => res.json(result))
            .catch(err => next(err))
    }
}
