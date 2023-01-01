import { Router }                from 'express'
import { AdminReviewController }  from './review.controller.admin'

export const AdminReviewRoutes = (router: Router, prefix: string) => {

    router
        .route(`${ prefix }/reviews`)
        .get(
            AdminReviewController.index
        )

    router
        .route(`${ prefix }/reviews/:id`)
        .get(
            AdminReviewController.show
        )
        .delete(
            AdminReviewController.destroy
        )
}
