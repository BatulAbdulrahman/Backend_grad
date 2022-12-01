import {NextFunction, Request , Response } from "express"

export const Can = (can :string)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        console.log(`User Can : ${can} `)//View Doctors!
        next()
    }
}