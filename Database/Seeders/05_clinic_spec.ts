import { Knex }         from "knex";
import { clinics_Data } from '../../private/specialization'
import { v4 as uuid }   from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clsp").del();


    // get related data
    //const clinics = await knex('clinic').select('id')
    const specs = await knex('specialization').select('id')

    /**
     * transfer these values into relations
     *
     * */

    let clinics: any  = []
    let clsp: any = []
    //let specDoc: any  = []

    // Build seed entries
    clinics.forEach((clinic: any) => {
       // let clinic_id = uuid()

        // get doctor clinic
        let specClinic = specs.filter(cl => cl.id == clinic.specialization)[0]

        
        if (specClinic && specClinic.id) {
            clsp.push({
                clinic_id : clinic.id,
                spec_id: specClinic.id,
              //  day: 'sun',
                //time: '10:30' // insert properties to the worktime array
            })
        }

console.log(specClinic)



        delete clinic.specialization

        clinics.push({
            ...clinic,
            id: clinic.id
        })
    })

    await knex.batchInsert('clinic', clinics)
    await knex.batchInsert('clsp', clsp)

}
