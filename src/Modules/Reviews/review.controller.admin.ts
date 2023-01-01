import { NextFunction, Request, Response } from "express"
import { UtilDatabase }                    from '../../Utils/finder'
import { Review }                          from './review.model'

export const AdminReviewController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Review
            .query()
            .withGraphFetched(`[user]`)

        return await UtilDatabase
            .finder(Review, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params
        let lang     = req.query.lang

        await Review
            .query()
            .context({ lang })
            .findById(id)
            .withGraphFetched(`[user]`)
            .throwIfNotFound({ message: 'Review not found!' })
            .then((result: Review) => res.json(result))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * Destroy an instance of a model
     * ---------------------------------------------------------------------
     */
    destroy: async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        await Review
            .query()
            .deleteById(id)
            .throwIfNotFound({ message: 'Review not found!' })
            .returning('*')
            .then((result) => {
                // TODO: update average on delete
                res.json(result)
            })
            .catch(err => next(err))
    }
}
