import { Router }                from 'express'

import multer from 'multer'
import { AdminDoctorController } from './doctor.controller.admin'
import { PublicDoctorController } from './doctor.controller.public'

export const PublicDoctorRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/doctors`, PublicDoctorController.index)
    router.get(`${ prefix }/doctors/:id`, PublicDoctorController.show)
}

export const AdminDoctorRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin
const upload = multer()
    router
        .route(`${ prefix }/doctors`)
        .get(
            AdminDoctorController.index
        )
        .post(
            upload.none(),
           AdminDoctorController.store
        )

    router
        .route(`${ prefix }/doctors/:id`)
        .get(
        //    Can('view doctor'),
            AdminDoctorController.show
        )
        // this is for any updates in doctor data to show in controller when i need show it
        .patch(
         //   Can('update doctor'),
            AdminDoctorController.update
        )
        .delete(
          //  Can('delete doctor'),
            AdminDoctorController.destroy
        )
}
