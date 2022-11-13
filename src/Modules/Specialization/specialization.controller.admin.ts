import { NextFunction, Request, Response } from "express"
import Specialization from "./specialization.model"

export const AdminSpecializationController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        await Specialization
            .query()
            .then((results: Specialization[]) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Specialization
            .query()
            .findById(id)
            .withGraphFetched(`[
                clinics,
            ]`)
            .throwIfNotFound({ message: 'Specialization not found!' })
            .then((result: Specialization) => res.json(result))
            .catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body

        await Specialization
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

        await Specialization
            .query()
            .patchAndFetchById(req.params.id, data)
            .throwIfNotFound({ message: 'Specialization not found!' })
            .then((result: Specialization) => res.json(result))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model , like a delete
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Specialization
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Specialization not found!' })
            .then((result) => res.json(result))
            .catch(err => next(err))
    }
}
