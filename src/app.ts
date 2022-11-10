import express, {Application} from 'express'
import { PublicDoctorController } from './Modules/Doctor/doctor.controller.public'

export const app: Application = express()

app.route('/').get(PublicDoctorController.index)