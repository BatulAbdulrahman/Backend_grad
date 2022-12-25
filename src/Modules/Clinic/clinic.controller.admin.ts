import { NextFunction, Request, Response } from "express"
import { UtilDatabase } from "../../Utils/finder"
import Clinic from "./clinic.model"

export const AdminClinicController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Clinic
        .query()
        return await UtilDatabase
        .finder(Clinic, req.query , query)
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

        await Clinic
            .query()
            .findById(id)
            .throwIfNotFound({ message: 'Clinic not found!' })
            .then((result: Clinic) => res.json(result))
            .catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body

        await Clinic
            .query()
            .insert(data)
            .then((result) => res.json(result))
            .catch(err => next(err))

    },

    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body

        await Clinic
            .query()
            .patchAndFetchById(req.params.id, data)
            .throwIfNotFound({ message: 'Clinic not found!' })
            .then((result: Clinic) => res.json(result))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model , like a delete
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Clinic
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Clinic not found!' })
            .then((result) => res.json(result))
            .catch(err => next(err))
    }
}
