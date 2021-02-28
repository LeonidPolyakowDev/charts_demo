const GET_ALL_CHARTS = 'CHART/GET_ALL_CHARTS'
const CREATING_CHART = 'CHART/CREATING_CHART'
const EDIT_CHART = 'CHART/EDIT_CHART'
const CLOSE = 'CHART/CLOSE'

const initialState = {
    data: null,
    creating: false,
    types: [
        {
            name: 'Стобчатый', value: 'bar'
        },
        {
            name: 'Круговой', value: 'pie'
        },
        {
            name: 'Линейный', value: 'line'
        }
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CHARTS:
            return state
        case CREATING_CHART:
            return {...state, creating: true}
        case EDIT_CHART:
            return {...state, data: action.record, creating: false}
        case CLOSE:
            return {...state, creating: false, data: null}
        default:
            return state
    }
}

export const createChart = () => ({type: CREATING_CHART})
export const editChart = (record) => ({type: EDIT_CHART, record})
export const closeWin = () => ({type: CLOSE})
