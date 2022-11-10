/*import {Knex} from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("specialization").del();

    const specializations = [
        {name: "عيون"},
        {name: "أطفال"},
        {name: "جراحة"},
        
    ]

    // Inserts seed entries
    await knex("specialization").insert(specializations)

    // After seeding insert for postgres integer ids needs to be synced
    await knex.raw('select setval(\'specialization_id_seq\', max(id)) from specialization')
}*/
import {Knex}       from "knex";
import {Specialization_DATA} from '../../private/specialization'
import {v4 as uuid} from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("specialization").del();
    await knex("clsp").del();


    // Build seed entries

    const clinics = await knex('clinic').select('id', 'name','location','description')

    const specialization_DATA = Specialization_DATA

    /**
     * transfer these values into relations
     *
     * */

     let specializations: any       = []
     let clsp: any = []
 
     specialization_DATA.forEach((specialization: any) => {
         let spec_id = uuid()
 
        // let wt_clinic = doctor.clinics.split(',')
         clinics.forEach((clinic: any) => {
             let name   = clinic.name.toLowerCase().trim()
             let result = clinics.filter(cl => cl.name == name)[0]
 
             if (result && result.id) {
                 clsp.push({spec_id, clinic_id: result.id})
             }
         })
 
        
 
         delete specialization.clinic
 
         specializations.push({
             ...specialization,
             id: spec_id
         })
     })
 
     await knex.batchInsert('specialization', specializations)
     await knex.batchInsert('clsp', clsp)
 
 }
