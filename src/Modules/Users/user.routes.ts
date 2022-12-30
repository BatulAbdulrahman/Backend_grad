import { Router }              from 'express'
import { Multer }              from '../../Middlewares/multer'
import { UserController }      from './user.controller'
import { AdminUserController } from './user.controller.admin'

export const UserRoutes = (router: Router, prefix: string) => {
    router
        .route(`${prefix}`)
        .post(
            Multer.single("users","users", "img"),
            UserController.update
        )
}

export const AdminUserRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete users to admin

    router
        .route(`${prefix}/users`)
        .get(
            AdminUserController.index
        )
    // .post(
    //     Multer.simple('users'),
    //     AdminUserController.store
    // )

    router
        .route(`${prefix}/users/:id`)
        .get(
            AdminUserController.show
        )
    // .patch(
    //     Multer.none,
    //     AdminUserController.update
    // )
    // .delete(
    //     AdminUserController.destroy
    // )
}
