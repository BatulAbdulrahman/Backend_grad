import {Request, Response} from "express";
import {INVALIDATE_COOKIE} from '../../config'

export const logout = async (req: Request, res: Response) => {

    const {cookie} = req.headers

    if (cookie) {
        return res
            .setHeader('Set-Cookie', [INVALIDATE_COOKIE])
            .status(200)
            .json({
                "message": "logged out!"
            })
            .end()
    } else {
        return res
            .setHeader('Set-Cookie', [INVALIDATE_COOKIE])
            .status(401)
            .json({
                error:{
                    type: 'Unauthenticated',
                    message: "not logged in...",
                    data: {}
                }
            })
    }
}
