const ADD = 'CHART_DATA/ADD'
const REMOVE = 'CHART_DATA/REMOVE'
const EDIT = 'CHART_DATA/EDIT'
const SAVE = 'CHART_DATA/SAVE'
const SELECT = 'CHART_DATA/SELECT'

const initialState = {
    selected: null,
    data: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT:
            return {...state, selected: action.record}
        case ADD:
            return state
        case REMOVE:
            return {...state}
        case EDIT:
            return {...state}
        case SAVE:
            return {...state}
        default:
            return state
    }
}

export const select = () => ({type: ADD})
export const add = () => ({type: ADD})
export const remove = (record) => ({type: REMOVE, record})
export const edit = () => ({type: EDIT})
export const save = () => ({type: SAVE})
