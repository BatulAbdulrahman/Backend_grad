import {Knex}       from "knex";
import {DOCTORS_DATA} from '../../private/doctors'
import {v4 as uuid} from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("doctors").del();
    await knex("work_time").del();


    // Build seed entries

    const worktime = await knex('clinic').select('id', 'name','location')

    const doctors_data = DOCTORS_DATA

  

    let doctors: any    = []
    let work_time: any = []

    doctors_data.forEach((doctor: any) => {
        let doctor_id = uuid()

        let wotime = doctor.worktime.split(',')
        wotime.forEach((wotime: any) => {
            let name   = wotime.trim()
            let result = worktime.filter(clinic => clinic.name == name)[0]

            if (result && result.id) {
                work_time.push({doctor_id, clinic_id: result.id})
            }
        })

  
        delete doctor.clinic

        doctors.push({
            ...doctor,
            id: doctor_id
        })
    })

    await knex.batchInsert('doctors', doctors)
    await knex.batchInsert('work_time', work_time)

}
