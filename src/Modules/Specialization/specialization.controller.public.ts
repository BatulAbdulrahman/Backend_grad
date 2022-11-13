import { NextFunction ,Request,Response} from "express";
import Specialization from "./specialization.model";

export const PublicSpecializationController ={
    index:async(req:Request,res:Response,next:NextFunction)=>{
        await Specialization
        .query() //where('is_disabled', false)
        .modify('enabled')
        .then((results:Specialization[])=>{
            res.json(results)
        })
        .catch(err=>next(err))
    },
    show:async(req:Request,res:Response,next:NextFunction)=>{
        await Specialization
        .query() 
        .findById(req.params.id)
        .modify('enabled')
        .throwIfNotFound({message: 'Specialization not found!'})
        //where('is_disabled', false)
        .then((results:Specialization | undefined)=>{
        
        res.json(results)

        })
        .catch(err=>next(err))
    }
}
