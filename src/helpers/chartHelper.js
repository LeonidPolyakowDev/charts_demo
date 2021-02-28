const getValueOfObj = (array, typeOf) => {
    if(!typeOf) return null
    let res = []
    array.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
            if(typeof value === typeOf) {
                res.push(value)
                break;
            }
        }
    })
    return res
}

export const getLabels = (array) => {
    return getValueOfObj(array, 'string')
}

export const getNumbers = (array, action) => {
    return getValueOfObj(array, 'number')
}
