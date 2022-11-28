import { Knex }         from "knex";
import { DOCTORS_DATA } from '../../private/doctors'
import { v4 as uuid }   from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_time").del();
    await knex("spec_doc").del();
    await knex("doctors").del();


    // get related data
    const clinics = await knex('clinic').select('id')
    const specs = await knex('specialization').select('id')

    /**
     * transfer these values into relations
     *
     * */

    let doctors: any  = []
    let worktime: any = []
    let specDoc: any  = []

    // Build seed entries
    DOCTORS_DATA.forEach((doctor: any) => {
        let doctor_id = uuid()

        // get doctor clinic
        let doctorClinic = clinics.filter(cl => cl.id == doctor.clinic)[0]

        
        if (doctorClinic && doctorClinic.id) {
            worktime.push({
                doctor_id,
                clinic_id: doctorClinic.id,
                day: 'sun',
                time: '10:30' // insert properties to the worktime array
            })
        }


        // get doctor specialization
        let doctorSpec = specs.filter(cl => cl.id == doctor.specialization)[0]

        if (doctorSpec && doctorSpec.id) {
            specDoc.push({ doctor_id, spec_id: doctorSpec.id })
        }


        delete doctor.clinic
        delete doctor.specialization

        doctors.push({
            ...doctor,
            id: doctor_id
        })
    })
    /*  await Clinic.relatedQuery('doctors')
     .for(
     Clinic.query()
     .where('name', 'سناء')
     .limit(1)
     )
     .relate([100, 200, 300, 400]);*/

    await knex.batchInsert('doctors', doctors)
    await knex.batchInsert('work_time', worktime)
    await knex.batchInsert('spec_doc', specDoc)

}
