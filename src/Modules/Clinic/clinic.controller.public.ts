import { NextFunction ,Request,Response} from "express";
import Clinic from "./clinic.model";

export const PublicClinicController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
        await Clinic
        .query() //where('is_disabled', false)
        .then((results:Clinic[])=>{
        
res.json(results)
        })
        .catch(err=>next(err))
    }
}