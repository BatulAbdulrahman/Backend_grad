import {Knex} from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_time").del();

    const work_time = [
        {email: "google@gmail.com", name: "مشفى غريان", day: "الأحد", time: "صباحا"},
        {email: "laila@gmail.com", name: " مصحة فرح", day: "السبت", time: "مساءا"},
    ]

    const doctors = await knex('doctors').select('id', 'name','email')
    const clinics = await knex('clinic').select('id', 'name')

    let daytime_arr: any = []

    for (let work_times of work_time) {

        let doctor = doctors.filter(m => m.email == work_times.email)[0]
        let clinic = clinics.filter(a => a.name == work_times.name)[0]

        if (doctor && clinic) {
            daytime_arr.push({
                doctor_id: doctor.id,
                clinic_id: clinic.id,
                day: work_times.day,
                time:work_times.time
            })
        }
    }

    // Inserts seed entries
    await knex("work_time").insert(daytime_arr)
}
