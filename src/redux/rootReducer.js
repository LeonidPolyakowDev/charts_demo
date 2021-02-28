import {combineReducers} from 'redux'
import chartsReducer from "./charts";
import chartReducer from './chart'
import selectedLibReducer from './libChooser'

export const rootReducer = combineReducers({
    charts: chartsReducer,
    chart: chartReducer,
    selectedLib: selectedLibReducer
})