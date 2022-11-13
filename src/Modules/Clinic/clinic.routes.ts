import { Router }                from 'express'
import { AdminClinicController } from './clinic.controller.admin'
import { PublicClinicController } from './clinic.controller.public'

export const PublicClinicRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/clinic`, PublicClinicController.index)
    router.get(`${ prefix }/clinic/:id`, PublicClinicController.show)
}

export const AdminClinicRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/clinic`)
        .get(
            AdminClinicController.index
        )
        .post(
           // Multer.none,
           AdminClinicController.store
        )

    router
        .route(`${ prefix }/clinic/:id`)
        .get(
            AdminClinicController.show
        )
        .patch(
            AdminClinicController.update
        )
        .delete(
            AdminClinicController.destroy
        )
}
