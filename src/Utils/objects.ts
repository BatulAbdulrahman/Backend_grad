export const limit = (obj: any, keys: string[]) =>
    Object.entries(obj)
          .filter(([key]) => keys.includes(key))
          .reduce((obj, [key, val]) => Object.assign(obj, {[key]: val}), {});

export const distinct_array_obj_key = (arrayObj: any, key: string) => {
    return [...new Map(arrayObj.map((item: any) => [item[key], item])).values()]
}
