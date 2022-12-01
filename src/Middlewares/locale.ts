import { NextFunction, Request, Response } from 'express'
import { LOCALES_ENUM }                    from '../config'

export const Locale = (req: Request, res: Response, next: NextFunction) => {

    let lang = req.query.lang ?
               String(req.query.lang).trim().toLowerCase() :
               'ar'

    if (!LOCALES_ENUM.includes(lang))
        req.query.lang = 'ar'

    next()
}
