import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
        table.uuid("user_id").nullable()
        table.integer('rate').notNullable().checkBetween([1,5], "rate_check")
        table.text('comment').nullable()
        table.timestamp('created_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()

        table.foreign("user_id")
            .references("users.id")
            .onDelete("SET NULL")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('reviews')
}

