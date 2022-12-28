import * as jsonwebtoken                   from "jsonwebtoken"
import { INVALIDATE_COOKIE, JWT_SECRET }   from "../config"
import { ValidationError }                 from "objection"
import { Request, Response, NextFunction } from "express"
import { User }                            from '../Modules/Users/user.model'

export const JWT = async (req: Request, res: Response, next: NextFunction) => {
    let decodedToken
    let token: string = req.header('authorization') || ''
    const { cookie }  = req.headers

    if (!cookie && (!token || token === '')) {
        req.user = null
        return next()
    }

    try {
        // if no token is present check the cookie
        if (token == '' && (cookie && cookie != '')) {
            token = cookie.replace('accessToken=', '')
        }

        if (token != '' && token != undefined) {
            let trimmedToken: string | undefined = token.split(" ").pop()
            if (trimmedToken != null) {

                decodedToken = jsonwebtoken.verify(trimmedToken, JWT_SECRET, {})

                let user = await User
                    .query()
                    .findById(decodedToken.id)
                    .withGraphFetched({
                        roles: true
                    })

                if (user) {
                    user.roles = user.roles ? user.roles.map(role => role.name) : []
                    req.user   = user
                    return next()
                } else {
                    req.user = null
                    return next()
                }
            }
        }
    } catch (e: any) {

        let err = new ValidationError({
            type: e.name,
            message: e.message,
            data: {
                expired_at: e.expiredAt ? e.expiredAt : null
            }
        });

        res.setHeader('Set-Cookie', [ INVALIDATE_COOKIE ])
        return next(err)
    }
}
