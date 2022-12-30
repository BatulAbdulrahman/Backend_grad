import { NextFunction, Request, Response } from 'express'
import Clinic from '../Modules/Clinic/clinic.model'
import Specialization from '../Modules/Specialization/specialization.model'
import Doctor from '../Modules/Doctor/doctor.model'
import { User }                            from '../Modules/Users/user.model'

export const GetStatics = async (req: Request, res: Response, next: NextFunction) => {

    const doctorsTotal = await Doctor
        .query()
        .count()
        .then((rows: any) => Number(rows[0].count))

    const usersTotal = await User
        .query()
        .count()
        .then((rows: any) => Number(rows[0].count))

    const clinicsTotal = await Clinic
        .query()
        .count()
        .then((rows: any) => Number(rows[0].count))

    const specializationsTotal = await Specialization
        .query()
        .count()
        .then((rows: any) => Number(rows[0].count))

    const statistics = {
        doctors: doctorsTotal,
        clinics: clinicsTotal,
        users: usersTotal,
        specializations: specializationsTotal
    }

    res.json(statistics)
}
