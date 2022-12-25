import { QueryBuilder } from 'objection'
import { knex }         from '../../knexfile'

export class UtilDatabase {

    static filter(columns: string[], relations: string[], filterString: string) {

        let filtersArray: any = []

        let filters: any = filterString.split(',')

        filters.forEach((filter: string) => {

            let [ criteria, op, value ] = filter.split(':', 3)

            if (criteria && op && value) {

                criteria = criteria.toLowerCase()
                                   .replace(/ /g, '')
                value    = value.replace(/ /g, '')

                switch (op) {
                    case 'eq':
                        op = '=';
                        break;
                    case 'nq':
                        op = '!=';
                        break;
                    case 'gt':
                        op = '>';
                        break;
                    case 'gte':
                        op = '>=';
                        break;
                    case 'lt':
                        op = '<';
                        break;
                    case 'lte':
                        op = '<=';
                        break;
                    default:
                        op = '=';
                        break;
                }

                if (columns.concat(relations).includes(criteria))
                    filtersArray.push({ criteria, op, value })

            }
        })

        return filtersArray
    }

    static sort(columns: string[], sortString: string) {
        let sorts = sortString.split(',')

        let sortsArray: any = []

        sorts.forEach((item: string) => {
            let order  = item.startsWith('-') ? 'desc' : 'asc'
            let column = item.toLowerCase()
                             .replace('-', '')
                             .replace(/ /g, '')

            if (columns.includes(column)) {
                sortsArray.push({ column, order })
            }
        })

        return sortsArray
    }

    static async finder(model: any, args: any, query: QueryBuilder<any>): Promise<any> {

        let { q, lang, page, paginate, sorts, filters } = args

        if (q != undefined) {
            q = q.trim().replace(';')
        }

        // pagination stuff
        let offset: number; //size of page يعني قداش حيكون فاها متغير
        let total: number; //
        let lastPage: number;
        let from: number;
        let to: number;
        let fraction: number;

        if (!paginate) paginate = 12;

        if (!page || page <= 1) {
            page   = 1;
            offset = 0;
        } else {
            offset = page * paginate - paginate;
        }

        let columns = await knex(model.tableName)
            .columnInfo()
            .then(c => Object.keys(c))

        let relations = Object.keys(model.getRelations())

        let filtersArray: any = []
        let sortsArray        = [ { column: 'created_at' } ]

        if (sorts)
            sortsArray = this.sort(columns, sorts)

        if (filters)
            filtersArray = this.filter(columns, relations, filters)

        // Build the finder inquiry
        let inquiry = await query
            .context({ lang })
            .modify(qb => {

                // filter
                if (filtersArray.length > 0) {
                    filtersArray.forEach(filter => {
                        let { criteria, op, value } = filter
                        // console.log('inside finder: { criteria, op, value }')
                        // console.log({ criteria, op, value })
                        if (relations.includes(criteria)) {
                            qb.joinRelated(criteria)
                              .where(`${ criteria }.id`, op, value)
                        } else {
                            qb.where(criteria, op, value)
                        }
                    })
                }
                // search

                if (q) {
                    if (columns.includes('name')) {

                        q = q.split(' ').join('+') + ":*"
                        console.log(q)
                        console.log("columns.includes('name')")
                        console.log(columns.includes('name'))
                        qb.whereRaw('name @@ to_tsquery(?)', [ q ])
                    } /*else {

                        if (model.tableName == 'genres') {
                            qb.whereRaw(`name->>'${ lang }' ilike ?`, [ `%${ q }%` ])
                        } else {
                            qb.where(model.defaultSort, 'ilike', `%${ q }%`)
                        }
                    }*/
                }
            })
            .orderBy(sortsArray)
            .page(page - 1, paginate)

        total              = inquiry.total
        lastPage           = Math.ceil(total / paginate)
        let remainingItems = total % paginate;
        fraction           = remainingItems == 0 ? paginate : remainingItems
        from               = offset == 0 ? 1 : Number(offset + 1)
        to                 = page == lastPage ?
                             Number(offset) + Number(fraction) :
                             Number(offset) + Number(paginate)
        return {
            meta: {
                total,
                per_page: Number(paginate),
                current_page: Number(page),
                first_page: 1,
                last_page: lastPage,
                from,
                to,
                columns,
                relations,
                page_sizes: [ 12, 24, 50 ]
            },
            data: inquiry.results
        };
    }
}
