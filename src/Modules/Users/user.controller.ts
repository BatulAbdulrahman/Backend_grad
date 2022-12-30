import { NextFunction, Request, Response } from 'express'
import { unlink }                          from 'node:fs/promises'
import { ValidationError }                 from 'objection'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import { User }                            from './user.model'

export const UserController = {

    /**
     * ---------------------------------------------------------------------
     * Update user profile
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const user = req.user as User
        const data = req.body // password, password_confirmation

        let err = new ValidationError({
            message: "password does not match confirmation",
            type: "InputValidationError"
        })

        // user must not disable himself only allowed in admin
        if ('is_disabled' in data) {
            // data.is_disabled = booleanParser(data.is_disabled)
            delete data.is_disabled
        }

        if ('password' in data && data.password) {
            // if password is provided and no password_confirmation present
            if (data.password && !('password_confirmation' in data))
                return next(err)

            // if password is provided and password_confirmation does not match
            if ('password_confirmation' in data && data.password_confirmation) {
                let valid = data.password == data.password_confirmation
                if (!valid) return next(err)
            }
            delete data.password_confirmation
        }

        const trx = await User.startTransaction()

        try {

            await user
                .$query(trx)
                .patchAndFetch(data)
                .then(async (result: User) => {
                    return res.json(result)
                })

            await trx.commit()
        } catch (err) {
            await trx.rollback()
            return next(err)
        }
    }

}
