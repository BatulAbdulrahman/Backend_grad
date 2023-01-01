import fs    from "fs"
import path  from "path"
import sharp from 'sharp'

export const generateThumb = async (filepath, filename) => {

    const thumb_path = path.resolve(filepath, 'thumbs')

    // create the directory if it does not exist
    fs.stat(thumb_path, (err, stats) => {
        if (!stats) {
            fs.mkdir(thumb_path, {recursive: true}, (err, path) => {
                if (err) console.log(err)
                console.log('created:', path)
            })
        }
    })

    const thumb_no_ext_name = path.basename(filename).split('.').reverse().pop()
    const thumb_name        = 'thumb_' + thumb_no_ext_name + '.png'
    const store_in          = path.resolve(thumb_path, thumb_name)
    const original          = path.resolve(filepath, filename)
    const file              = await fs.readFileSync(original)

    return await sharp(file)
        .resize(
            150,
            150,
            {fit: sharp.fit.outside}
        )
        .png({quality: 100})
        .toFile(store_in)
        .then(() => thumb_name)
        .catch(err => console.log(err))

}
