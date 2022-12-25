import { Model } from 'objection'
import { knex }  from '../../knexfile'

const fn = async () => {

}

fn().then(() => {

    let roles   = [
        {id: 1, name: "admin"},
        {id: 2, name: "user"},
        {id: 3, name: "doctor"},
        {id: 4, name: "guest"},
    ]
    let nums   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let stringArr   = ["hu", 'how', 'are', 'you']
    let filterEven = nums.filter(el => el % 2 == 0)
    let filterOdd = nums.filter(el => el % 2 == 1)

    let mapNums = nums.map((el) => el * el)
    let mapRoles = roles.map((el) => el.name)
    let reduceNums = stringArr.reduce((previous,current) => previous + current)

    console.log(filterEven)
    console.log(filterOdd)
    console.log(mapNums)
    console.log(reduceNums)
    console.log(roles)
    console.log(mapRoles)
    console.log('--------------')
    console.log('Run trying')

    process.exit(0)
})
