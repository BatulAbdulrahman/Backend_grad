import { NextFunction ,Request,Response} from "express";
import Doctor from "./doctor.model";

export const PublicDoctorController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
        await Doctor
        .query() //where('is_disabled', false)
        .then((results:Doctor[])=>{
        
res.json(results)
        })
        .catch(err=>next(err))
    }
}