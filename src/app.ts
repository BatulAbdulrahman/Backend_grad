import express, {Application} from 'express'
import { PublicClinicController } from './Modules/Clinic/clinic.controller.public'
import { PublicDoctorController } from './Modules/Doctor/doctor.controller.public'

export const app: Application = express()

app.route('/').get(PublicDoctorController.index)
app.route('/').get(PublicClinicController.index)
//app.route('/id').get(PublicDoctorController.show)