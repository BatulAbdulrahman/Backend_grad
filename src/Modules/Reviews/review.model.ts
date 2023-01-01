import { Model, QueryBuilderType } from 'objection'
import { TimestampedModel }        from '../Shared/TimestampedModel'
import { User }                    from '../Users/user.model'

export class Review extends TimestampedModel {

    static tableName   = 'reviews'
    static defaultSort = 'rate'

    id!: string
    user_id!: string | null
    rate!: number
    comment!: string | null

    user?: User | undefined

    /*
     * ---------------------------------------------------------------------
     * Static methods
     * ---------------------------------------------------------------------
     */
    static jsonSchema = {
        type: 'object',
        required: ['comment', 'rate'],
        properties: {
            comment: { type: 'string', minLength: 10 },
            rate: { type: 'number', minimum: 1, maximum: 5 }
        }
    }

    // BEFORE
    // async $afterInsert(qc: QueryContext) {
    //
    //    // TODO: update movie average rating
    //     return super.$beforeInsert(qc)
    // }
    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
    static relationMappings = () => ({
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'reviews.user_id',
                to: 'users.id'
            },
            filter: (qb: QueryBuilderType<User>) => qb.select('name', 'email',)
        }
    })
}
