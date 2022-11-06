import {Knex} from "knex";

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
}
