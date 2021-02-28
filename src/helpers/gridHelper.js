const _ = require('lodash');

export const insertItem = (array, action) => {
    let newArray = array.slice()
    newArray.splice(action.index, 0, action.item)
    return newArray
}

export const removeItem = (array, action) => {
    let newArray = array.slice()
    newArray.splice(action.index, 1)
    return newArray
}

export const updateItem = (array, action) => {
    return array.map((item, index) => {
        if (index !== action.index) {
            return item
        }

        return {
            ...item,
            ...action.item
        }
    })
}

export const getItemIndex = (array, record) => {
    return _.findIndex(array, record)
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}