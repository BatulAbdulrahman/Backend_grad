import fs from 'fs'
import axios from "axios";

const downloadUrl = async (url, dest) => {
  await axios
    .get(url, {responseType: 'stream'})
    .then(response => new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(dest))
          .on('finish', resolve)
          .on("error", reject)
      })
    )
    .catch(err => console.log(err))
}

export default downloadUrl
