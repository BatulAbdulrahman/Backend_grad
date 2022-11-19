import {Knex} from "knex";

const table_name = 'spec_doc'//doctors or specializtion

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table
            .uuid('doctor_id')
            .references('doctors.id')

        table
            .integer('spec_id')
            .references('specialization.id')

      
        table.primary(['spec_id', 'doctor_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

