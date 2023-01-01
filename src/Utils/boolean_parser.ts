function booleanParser (value: any) {
    let parsedValue

    switch (value) {
        case 'true':
            parsedValue = true
            break
        case true:
            parsedValue = true
            break
        case 't':
            parsedValue = true
            break
        case '1':
            parsedValue = true
            break
        case 'yes':
            parsedValue = true
            break
        case 'y':
            parsedValue = true
            break
        case 1:
            parsedValue = true
            break
        case 'false':
            parsedValue = false
            break
        case false:
            parsedValue = false
            break
        case 'f':
            parsedValue = false
            break
        case '0':
            parsedValue = false
            break
        case 'no':
            parsedValue = false
            break
        case 'n':
            parsedValue = false
            break
        case 0:
            parsedValue = false
            break
        default:
            parsedValue = Boolean(value)
            break
    }

    return parsedValue
}

export default booleanParser
