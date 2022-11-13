import { Router }                from 'express'
import { AdminDoctorController } from './doctor.controller.admin'
import { PublicDoctorController } from './doctor.controller.public'

export const PublicDoctorRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/doctors`, PublicDoctorController.index)
    router.get(`${ prefix }/doctors/:id`, PublicDoctorController.show)
}

export const AdminDoctorRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/doctors`)
        .get(
            AdminDoctorController.index
        )
        .post(
           // Multer.none,
           AdminDoctorController.store
        )

    router
        .route(`${ prefix }/doctors/:id`)
        .get(
            AdminDoctorController.show
        )
        .patch(
            AdminDoctorController.update
        )
        .delete(
            AdminDoctorController.destroy
        )
}
