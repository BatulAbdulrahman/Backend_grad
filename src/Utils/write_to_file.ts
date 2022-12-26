import fs from "fs/promises";

export const writeToFile = async (filepath, data) => {
  await fs.appendFile(filepath, data)
    // .then(() => console.log(`written ${data.length} character to ${filepath}`))
    .catch(err => console.error(err))
}
