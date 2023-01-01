import { Knex } from "knex";

type UserRoleType = {
    user_id: string,
    role_id: number
}

export async function up(knex: Knex): Promise<void> {

    // create roles in their own tables
    await knex('roles').insert([
        { id: 1, name: "admin" },
        { id: 2, name: "user" },
        { id: 3, name: "doctor" }
    ])

    // update roles table sequence
    await knex.raw('select setval(\'roles_id_seq\', max(id)) from roles')

    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('role')
    })
}

export async function down(knex: Knex): Promise<void> {

    return await knex.schema.alterTable('users', (table) => {
        table.string('role').defaultTo('user')
    }).then(async () => {

        let users = await knex('users')
            .join("user_roles", "user_roles.user_id", "users.id")
            .join("roles", "user_roles.role_id", "roles.id")
            .select(
                "users.id",
                "roles.name as role_name"
            )

        for (let user of users) {
            await knex("users")
                .where('id', user.id)
                .first()
                .update({ role: user.role_name })
        }
    })
}


/*import { Knex } from "knex";

type UserRoleType = {
    user_id: string,
    role_id: number
}

export async function up(knex: Knex): Promise<void> {

    // create roles in their own tables
    await knex('roles').insert([
        { id: 1, name: "admin" },
        { id: 2, name: "user" },
        { id: 3, name: "doctor" }
    ])

    // update roles table sequence
    await knex.raw('select setval(\'roles_id_seq\', max(id)) from roles')

    // get all users with role
    let users = await knex('users')
        .whereNotNull('role')
        .select('id', 'role')

    if (users.length > 0) {
        let userRolesArr: UserRoleType[] = []

        for (let user of users) {
            userRolesArr.push({
                user_id: user.id,
                role_id: user.role === "admin" ? 1 : (user.role == "doctor") ? 3 : 2
            })
        }

        await knex('user_roles').insert(userRolesArr)
    }

    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('role')
    })
}

export async function down(knex: Knex): Promise<void> {

    return await knex.schema.alterTable('users', (table) => {
        table.string('role').defaultTo('user')
    }).then(async () => {

        let users = await knex('users')
            .join("user_roles", "user_roles.user_id", "users.id")
            .join("roles", "user_roles.role_id", "roles.id")
            .select(
                "users.id",
                "roles.name as role_name"
            )

        for (let user of users) {
            await knex("users")
                .where('id', user.id)
                .first()
                .update({ role: user.role_name })
        }
    })
}*/

