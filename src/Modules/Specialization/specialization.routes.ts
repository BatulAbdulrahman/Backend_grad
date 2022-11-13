import { Router }                from 'express'
import { AdminSpecializationController } from './specialization.controller.admin'
import { PublicSpecializationController } from './specialization.controller.public'

export const PublicSpecializationRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/specialization`, PublicSpecializationController.index)
    router.get(`${ prefix }/specialization/:id`, PublicSpecializationController.show)
}

export const AdminSpecializationRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/specialization`)
        .get(
            AdminSpecializationController.index
        )
        .post(
           // Multer.none,
           AdminSpecializationController.store
        )

    router
        .route(`${ prefix }/specialization/:id`)
        .get(
            AdminSpecializationController.show
        )
        .patch(
            AdminSpecializationController.update
        )
        .delete(
            AdminSpecializationController.destroy
        )
}
