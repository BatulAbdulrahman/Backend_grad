import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_time").del();
    await knex("clinic").del();

     const clinics = [
        {
            id: 1,
            name: "مشفى غريان الطبي",
            location: "كوبري السقائف",
            description: "مشفى ايوائي بمنطقة السقائف في غريان",
            phone:"0913036612",
        },
        {
            id: 2,
            name: " مصحة فرح",
            location: "تغسات",
            description: "مصحة ايوائية بمنطقة تغسات في غريان",
        phone:"0912744870",
        },
        {
            id: 3,
            name: "مشفى أزير",
            location: "غريان , بني وزير",
            description: "مشفى ايوائي بمنطقة بني وزير في غريان",
            phone:"0920024010"
        }
    ]

    // Inserts seed entries
    await knex("clinic").insert(clinics)

    // After seeding insert for postgres integer ids needs to be synced
    await knex.raw('select setval(\'clinic_id_seq\', max(id)) from clinic')
}
