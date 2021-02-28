const SELECT = 'LIB_CHOOSER/SELECT'

const initialState = {
    selected: 'nivo'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT:
            return {...state, selected: action.libName}
        default:
            return state
    }
}

export const select = (libName) => ({type: SELECT, libName})
