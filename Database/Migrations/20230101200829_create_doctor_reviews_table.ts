import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('doctor_reviews', (table) => {
        table.uuid('review_id')
             .references('reviews.id')
             .onDelete('CASCADE')

        table.uuid('doctor_id')
             .references('doctors.id')
             .onDelete('CASCADE')

        table.primary(['review_id', 'doctor_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('doctor_reviews')
}

