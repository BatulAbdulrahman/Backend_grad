import { NextFunction, Request, Response } from "express"
import Doctor                               from './doctor.model'

export const AdminDoctorController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        await Doctor
            .query()
            .then((results: Doctor[]) => res.json(results))
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

        const data = req.body

        await Doctor
            .query()
            .insert(data)
            .then(async(result) =>{
                await result.$relatedQuery("clinics").relate([1,2,3])
                res.json(result)})
            .catch(err => next(err))

    },

    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body

        await Doctor
            .query()
            .patchAndFetchById(req.params.id, data) // .patchAndFetchById(req.params.id, {name : })
            .throwIfNotFound({ message: 'Doctor not found!' })
            .then((result: Doctor) => res.json(result))
            .catch(err => next(err))
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
            .then((result) => res.json(result))
            .catch(err => next(err))
    }
}
