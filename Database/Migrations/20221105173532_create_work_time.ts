import {Knex} from "knex";

const table_name = 'work_time'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.string('day').nullable()
        table.string('time').nullable()
        table
            .integer('doctor_id')
            .references('doctors.id')

        table
            .integer('clinic_id')
            .references('clinic.id')

        table.primary(['doctor_id', 'clinic_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

