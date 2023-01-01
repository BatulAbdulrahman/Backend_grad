import { Knex } from "knex";
import * as bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash("password", salt)

    // Inserts seed entries
     // Inserts seed entries
     await knex("users").insert([
        { id: "22428207-7a08-46e2-99d0-148c733ab029", email: 'admin@google.com', password: hash },
        { id: "e0eec3e5-39aa-4e40-9055-5477c67bb99f", email: 'user@google.com', password: hash },
        { id: "dc74ed55-d016-417c-a4dc-ff31c6cbf78f", email: 'google@gmail.com', password: hash },
        { id: "9aec0def-98c7-4bf8-8c7e-ed83b7789096", email: 'b2l@gmail.com', password: hash }
    ]);
    //dc74ed55-d016-417c-a4dc-ff31c6cbf78f

    await knex('user_roles').insert([
        {
            user_id: "22428207-7a08-46e2-99d0-148c733ab029",
            role_id: 1
        },
        {
            user_id: "e0eec3e5-39aa-4e40-9055-5477c67bb99f",
            role_id: 2
        },
        {
            user_id: "dc74ed55-d016-417c-a4dc-ff31c6cbf78f",
            role_id: 3
        },
        {
            user_id: "9aec0def-98c7-4bf8-8c7e-ed83b7789096",
            role_id: 3
        }
    ])
   /* await knex("users").insert([
        { name : "admin" ,email: "admin@gmail.com", password: hash, },
        { name : "user" ,email: "user@gmail.com", password: hash},
       {name : "doctor" , email: "doctor@gmail.com", password: hash ,},
    ]);*/
};
