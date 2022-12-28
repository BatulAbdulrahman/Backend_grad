import { NextFunction, Request, Response } from "express"
import { ValidationError }                 from 'objection'
import { JWT_EXPIRY }                      from '../../config'
import { User }                            from '../Users/user.model'
import ms                                  from 'ms'

export const register = async (req: Request, res: Response, next: NextFunction) => {

    let { email, password, password_confirmation } = req.body

    if (email) email = String(email).trim().toLowerCase()

    const trx = await User.startTransaction()

    await User
        .query(trx)
        .where('email', email)
        .first()
        .then(async (user) => {

            if (user) {
                throw new ValidationError({
                    type: "ModelValidation",
                    message: "User already exist"
                })
            }

            // TODO: validate password == password confirmation

            let newUser = await User
                .query(trx)
                .insert({ email, password })
                .returning('*')

            await newUser.$relatedQuery("roles", trx).relate([2])

            const generated = newUser.$genToken()
            const token     = `Bearer ${generated}`

            return res
                .setHeader('Set-Cookie', [
                    `accessToken=${token}; path=/; HttpOnly; Max-Age=${ms(JWT_EXPIRY) / 100}; SameSite=None; Secure`
                ])
                .json({
                    status: 'success',
                    message: 'logged in',
                    token: newUser.$genToken()
                })
        })
        .catch(async (err) => {
            await trx.rollback()
            return next(err)
        })
        .finally(async () =>{
            await trx.commit()
        })

}
