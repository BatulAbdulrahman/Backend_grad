import * as path               from 'path'
import * as crypto             from "crypto"
import { readFile, writeFile } from "fs/promises"
import { ROOT_PATH }           from '../config'

const jwtGenSecret = async () => {

    let success  = false
    let replaced = false

    const envPath = path.resolve(ROOT_PATH, '.env')
    let secret    = crypto.randomBytes(256).toString('base64')

    if (secret) {
        success = true
        secret  = 'JWT_SECRET=' + secret
    }

    await readFile(envPath, 'utf8')
        .then((data) => {
            const exists = data.search(/^JWT_SECRET?.*/gm)

            if (exists != -1) {
                replaced = true
                return data.replace(/^JWT_SECRET?(.*[A-Za-z]).*/gm, secret)
            } else {
                return data + `\n${ secret }`
            }
        })
        .then(async r => await writeFile(envPath, r, 'utf8'))
        .catch(err => {
            success = false
            console.error(err)
        })

    console.log(`${ replaced ? 'Replaced' : 'Generated' } JWT Secret:`)
    console.log('-----------------------------------------------------------------')
    console.log(secret)
    console.log('-----------------------------------------------------------------')

    return success
}

jwtGenSecret()
    .then(r => console.log('jwt secret added to env:', r))
