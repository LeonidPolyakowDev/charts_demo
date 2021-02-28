import {updateItem, insertItem, removeItem} from '../helpers/gridHelper'
import {v4 as uuidv4} from 'uuid';

const GET_ALL_CHARTS = 'CHARTS/GET_ALL_CHARTS'
const REMOVE_ALL = 'CHARTS/REMOVE_ALL'
const ADD_CHART = 'CHARTS/ADD_CHART'
const UPDATE_CHART = 'CHARTS/UPDATE_CHART'
const REMOVE = 'CHARTS/REMOVE'
const _ = require('lodash');

const initialState = {
    items: [
        {
            id: uuidv4(),
            title: 'Диаграмма BAR',
            type: 'pie',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650},
                {name: 'Токио', value: 3740},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        },
        {
            id: uuidv4(),
            title: 'Диаграмма BAR 2',
            type: 'line',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650},
                {name: 'Токио', value: 3740},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        },
        {
            id: uuidv4(),
            title: 'Диаграмма BAR 2',
            type: 'bar',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        },
        {
            id: uuidv4(),
            title: 'Диаграмма BAR 2',
            type: 'bar',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        },
        {
            id: uuidv4(),
            title: 'Диаграмма BAR 2',
            type: 'bar',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        },
        {
            id: uuidv4(),
            title: 'Диаграмма BAR 2',
            type: 'bar',
            label: 'Города',
            data: [
                {name: 'Токио', value: 37400},
                {name: 'Дели', value: 28514},
                {name: 'Шанхай', value: 25582},
                {name: 'Сан-Паулу', value: 21650}
            ]
        }
    ]
}

// const validate = values => {
//     const errors = {}
//
//     const fields = ["login", "firstName", "lastName", "post"]
//     fields.forEach((field) => {
//         if (values && !values[field]) {
//             errors[field] = 'Поле обязательно к заполнению'
//         }
//     })
//     return {
//         isValid: Object.keys(errors).length === 0 && errors.constructor === Object,
//         errors
//     }
// }

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CHARTS:
            return state
        case REMOVE_ALL:
            return {...state, items: []}
        case UPDATE_CHART:
            let updatedItems = updateItem(state.items, {
                index: _.findIndex(state.items, {id: action.data.id}),
                item: action.data
            })
            return {...state, items: updatedItems}
        case ADD_CHART:
            let newItems = insertItem(state.items, {
                    index: 0,
                    item: {...action.data, id: uuidv4(), data: [
                            {label: 'Токио', earnings: 37400068},
                            {label: 'Дели', earnings: 28514000},
                            {label: 'Шанхай', earnings: 25582000},
                            {label: 'Сан-Паулу', earnings: 21650000}
                        ]}
                })
            return {...state, items: newItems}
        case REMOVE:
            let items = removeItem(state.items, {
                index: _.findIndex(state.items, {id: action.id})
            })
            return {...state, items: items}
        default:
            return state
    }
}

export const addChart = (data) => ({type: ADD_CHART, data})
export const updateChart = (data) => ({type: UPDATE_CHART, data})
export const removeChart = (id) => ({type: REMOVE, id})
export const removeAllChart = () => ({type: REMOVE_ALL})

