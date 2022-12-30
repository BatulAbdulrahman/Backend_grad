import { Router }                                                from 'express'
import { PublicAuthRoutes } from '../Modules/Auth/auth.routs'
import { errorHandler } from '../Middlewares/error.handler'
import { AdminClinicRoutes, PublicClinicRoutes }                 from '../Modules/Clinic/clinic.routes'
import { AdminDoctorRoutes, DoctorDoctorRoutes, PublicDoctorRoutes }                 from '../Modules/Doctor/doctor.routes'
import { AdminSpecializationRoutes, PublicSpecializationRoutes } from '../Modules/Specialization/specialization.routes'
import { Locale } from '../Middlewares/locale'
import { JWT } from '../Middlewares/Jwt'
import { RoleMiddleware } from '../Middlewares/RoleMiddleware'
import { AdminUserRoutes, UserRoutes } from '../Modules/Users/user.routes'
import { GetStatics } from './statistics.route'

export const applyRoutes = (): Router => {

    const router = Router()

    /**
     * -------------------------------------------------------
     * Authentication, Authorization and locale middlewares are first
     * to be registered on the Router
     * -------------------------------------------------------
     * */
     // TODO: add (authentication) and locale middlewares here

     router.use(Locale)
     router.use(JWT)
    /**
     * -------------------------------------------------------
     * All application routes can go here
     * -------------------------------------------------------
     * */
    const prefix = '/api/v1'
    //const prefix = ''
    /**
     * ------------------------------------------------------------------------------
     *  USER ROUTES
     * ------------------------------------------------------------------------------
     */
const user_prefix = prefix + '/user' // domain:8000/api/v1/user

router.use(user_prefix, RoleMiddleware(["user"]))
UserRoutes(router, user_prefix)

    /**
     * ------------------------------------------------------------------------------
     *  ADMIN ROUTES
     * ------------------------------------------------------------------------------
     */
    const admin_prefix = prefix + '/admin'

    router.use(admin_prefix, RoleMiddleware(["admin"]))
    AdminUserRoutes(router, admin_prefix)
    AdminDoctorRoutes(router, admin_prefix)
    AdminSpecializationRoutes(router, admin_prefix)
    AdminClinicRoutes(router, admin_prefix)

    router.get(`${admin_prefix}/statistics`, GetStatics)

    /**
     * ------------------------------------------------------------------------------
     *  Doctor admin ROUTES
     * ------------------------------------------------------------------------------
     */
    const doctor_prefix = prefix + '/doctor'
    router.use(doctor_prefix, RoleMiddleware(["doctor"]))
    DoctorDoctorRoutes(router,doctor_prefix)

    /**
     * ------------------------------------------------------------------------------
     *  PUBLIC ROUTES
     * ------------------------------------------------------------------------------
     */

    // insert any public middlewares above this line
    PublicDoctorRoutes(router, prefix)
    PublicClinicRoutes(router, prefix)
    PublicSpecializationRoutes(router, prefix)
    PublicAuthRoutes(router,prefix)
    router.get(`${prefix}/statistics`, GetStatics)
    /**
     * ------------------------------------------------------------------------------
     * !!!! The Error handler is the last middleware on the router !!!!
     * ------------------------------------------------------------------------------
     * */
    router.use(errorHandler)

    return router
}
