import { Model } from 'objection'

export default class Role extends Model {

    static tableName = 'roles'

    id!: number
    name!: string

    static jsonSchema = {
        type: 'object',
        required: [ 'name' ],
        properties: {
            name: { type: [ 'string', 'null' ], maxLength: 255 }
        }
    }
}