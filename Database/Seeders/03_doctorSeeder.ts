import {Knex}       from "knex";
import {DOCTORS_DATA} from '../../private/doctors'
import {v4 as uuid} from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_time").del();
    await knex("doctors").del();
    


    // Build seed entries

    const clinics = await knex('clinic').select('id', 'name','location','description')

    const doctors_data = DOCTORS_DATA

    /**
     * transfer these values into relations
     *
     * */

    let doctors: any       = []
    let worktime: any = []

    doctors_data.forEach((doctor: any) => {
        let doctor_id = uuid()

       // let wt_clinic = doctor.clinics.split(',')
        clinics.forEach((clinic: any) => {
            let name   = clinic.name.toLowerCase().trim()
            let result = clinics.filter(cl => cl.name == name)[0]

            if (result && result.id) {
                worktime.push({doctor_id, clinic_id: result.id})
            }
        })

       

        delete doctor.clinic

        doctors.push({
            ...doctor,
            id: doctor_id
        })
    })

    await knex.batchInsert('doctors', doctors)
    await knex.batchInsert('work_time', worktime)

}
