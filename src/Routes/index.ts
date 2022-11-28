import { Router }                                                from 'express'
import { errorHandler } from '../Middlewares/error.handler'
import { AdminClinicRoutes, PublicClinicRoutes }                 from '../Modules/Clinic/clinic.routes'
import { AdminDoctorRoutes, PublicDoctorRoutes }                 from '../Modules/Doctor/doctor.routes'
import { AdminSpecializationRoutes, PublicSpecializationRoutes } from '../Modules/Specialization/specialization.routes'

export const applyRoutes = (): Router => {

    const router = Router()

    /**
     * -------------------------------------------------------
     * Authentication, Authorization and locale middlewares are first
     * to be registered on the Router
     * -------------------------------------------------------
     * */
    // TODO: add (authentication) and locale middlewares here

    /**
     * -------------------------------------------------------
     * All application routes can go here
     * -------------------------------------------------------
     * */
    const prefix = '/api/v1'
    //const prefix = ''

    /**
     * ------------------------------------------------------------------------------
     *  ADMIN ROUTES
     * ------------------------------------------------------------------------------
     */
    const admin_prefix = prefix + '/admin'
    // TODO: lock this route behind a Role Middleware (authorization)
    AdminDoctorRoutes(router, admin_prefix)
    AdminSpecializationRoutes(router, admin_prefix)
    AdminClinicRoutes(router, admin_prefix)

    /**
     * ------------------------------------------------------------------------------
     *  PUBLIC ROUTES
     * ------------------------------------------------------------------------------
     */

    // insert any public middlewares above this line
    PublicDoctorRoutes(router, prefix)
    PublicClinicRoutes(router, prefix)
    PublicSpecializationRoutes(router, prefix)

    /**
     * ------------------------------------------------------------------------------
     * !!!! The Error handler is the last middleware on the router !!!!
     * ------------------------------------------------------------------------------
     * */
    router.use(errorHandler)

    return router
}
