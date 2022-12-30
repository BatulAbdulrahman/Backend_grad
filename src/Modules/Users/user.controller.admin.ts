import { NextFunction, Request, Response } from 'express'
import { UtilDatabase }                    from '../../Utils/finder'
import { User }                            from './user.model'

export const AdminUserController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = User.query()

        return await UtilDatabase
            .finder(User, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        await User
            .query()
            .findById(req.params.id)
            .withGraphFetched(`[roles]`)
            .throwIfNotFound({ message: 'User not found!' })
            .then((result: User) => res.json(result))
            .catch(err => next(err))
    }

}
