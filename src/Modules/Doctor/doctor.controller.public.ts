import { NextFunction ,Request,Response} from "express";
import { Review } from "../../Modules/Reviews/review.model";
import { ValidationError } from "objection";
import { UtilDatabase } from "../../Utils/finder";
import Doctor from "./doctor.model";

export const PublicDoctorController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
      /*  await Doctor
        .query() //where('is_disabled', false)
        .withGraphFetched(`[
            clinics,
            Specializations,
        ]`
        )
        .then((results:Doctor[])=>{
            res.json(results)
        })
        .catch(err=>next(err))*/
        let query = Doctor
        .query()
        //.modify('enabled')
        .withGraphFetched(`[
          clinics,
          Specializations,
          reviews.[user]
          ]`
        )
        return await UtilDatabase
        .finder(Doctor, req.query , query)
        .then((resules)=>res.json(resules))
        .catch(err => next(err))
        },
    
    show:async(req:Request,res:Response,next:NextFunction)=>{
        await Doctor
        .query() 
        .findById(req.params.id)
        .withGraphFetched(`[
            clinics,
            Specializations,
            reviews
        ]`
        )
        .throwIfNotFound({message: 'Doctor not found!'})
        //where('is_disabled', false)
        .then((results:Doctor | undefined)=>{
        
        res.json(results)

        })
        .catch(err=>next(err))
    },
    review: async (req: Request, res: Response, next: NextFunction) => {

        // after insert update doctor avg_rating

        let data: any = {}

        if (!req.user) {
            let err = new ValidationError({
                type: "ModelValidation",
                message: "no user, can't make review"
            })
            return next(err)
        }

        data.user_id = req.user.id
        data.rate    = "rate" in req.body ? Number(req.body.rate) : null
        data.comment = "comment" in req.body ? String(req.body.comment).trim() : null

        const trx = await Review.startTransaction()

        try {

            let doctor = await Doctor
                .query(trx)
                .findById(req.params.id)
                .modify('enabled')
                .throwIfNotFound({ message: 'Doctor not found!' })
                .then((result: Doctor) => result)

            let review = await Review
                .query(trx)
                .whereExists(
                    Review.relatedQuery('user')
                          .findById(data.user_id)
                ).first()

            if (review) {
                // updating existing review
                await review
                    .$query(trx)
                    .patchAndFetch(data)
                    .then(async (result: Review) => {
                        // update doctor average rating
                        res.json(result)
                    })
            } else {
                // inserting new review
                await Review
                    .query(trx)
                    .insert(data)
                    .returning("*")
                    .then(async (result: Review) => {
                        // update doctor average rating
                        await doctor
                            .$relatedQuery("reviews", trx)
                            .relate(result)

                        res.json(result)
                    })
            }

            await doctor.$recalculateAvg(trx)

            await trx.commit()
        } catch (err) {
            await trx.rollback()
            return next(err)
        }
    }

}
