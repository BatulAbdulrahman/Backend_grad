export const randomArrayValue = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
