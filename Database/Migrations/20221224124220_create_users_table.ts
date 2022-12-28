import { Knex } from "knex";

const table_name = 'users'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
        table.string('name')
        table.string('phone').unique().nullable()
        table.string('email').unique().nullable()
        table.string('password').nullable()
        table.string('role').defaultTo('user')
        table.boolean('is_disabled').defaultTo(false).notNullable()
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
   // await knex.schema.dropTableIfExists("user_roles")
    return knex.schema.dropTableIfExists(table_name)
}

