import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_time").del();
    await knex("clinic").del();

    const clinics = [
        {
            id: 1,
            name: "مشفى غريان",
            location: "كوبري السقائف",
            description: "blablablabla"
        },
        {
            id: 2,
            name: " مصحة فرح",
            location: "تغسات",
            description: "blablablabla"
        }
    ]

    // Inserts seed entries
    await knex("clinic").insert(clinics)

    // After seeding insert for postgres integer ids needs to be synced
    await knex.raw('select setval(\'clinic_id_seq\', max(id)) from clinic')
}
