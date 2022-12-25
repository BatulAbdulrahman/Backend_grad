import { NextFunction ,Request,Response} from "express";
import { UtilDatabase } from "../../Utils/finder";
import Clinic from "./clinic.model";

export const PublicClinicController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
        let query = Clinic
        .query()
        .withGraphFetched(`[
            doctors,
        ]`)
        return await UtilDatabase
        .finder(Clinic, req.query , query)
        .then((resules)=>res.json(resules))
        .catch(err => next(err))
        },
    
    
    show:async(req:Request,res:Response,next:NextFunction)=>{
        await Clinic
        .query() 
        /*.withGraphFetched(`[
            doctors,
        ]`
        )*/
        .findById(req.params.id)
        .throwIfNotFound({message: 'Clinic not found!'})
        //where('is_disabled', false)
        .then((results:Clinic | undefined)=>{
        
        res.json(results)

        })
        .catch(err=>next(err))
    }
}
