import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {

    // ROLES
    await knex.schema.createTable('roles', (table) => {
        table.increments('id', {primaryKey: true})
        table.string('name').unique()
    })

    // reset sequence if re-applying the migration
    await knex.raw('select setval(\'roles_id_seq\', max(id)) from roles')

    // USER / ROLES
    return knex.schema.createTable('user_roles', (table) => {
        table.uuid('user_id')
             .references('users.id')
             .onDelete('CASCADE')
        table.integer('role_id').unsigned().references('roles.id')
        table.primary(['user_id', 'role_id'])
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_roles')
    return knex.schema.dropTableIfExists('roles')
}

