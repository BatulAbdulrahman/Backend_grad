import { NextFunction ,Request,Response} from "express";
import { UtilDatabase } from "../../Utils/finder";
import Specialization from "./specialization.model";

export const PublicSpecializationController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
        let query = Specialization
        .query()
        .withGraphFetched(`[
            doctors.[clinics],
        ]`)
        return await UtilDatabase
        .finder(Specialization, req.query , query)
        .then((resules)=>res.json(resules))
        .catch(err => next(err))
        },
    show:async(req:Request,res:Response,next:NextFunction)=>{
        await Specialization
        .query() 
        .findById(req.params.id)
       // .modify('enabled')
        .throwIfNotFound({message: 'Specialization not found!'})
        //where('is_disabled', false)
        .then((results:Specialization | undefined)=>{
        
        res.json(results)

        })
        .catch(err=>next(err))
    }
}
