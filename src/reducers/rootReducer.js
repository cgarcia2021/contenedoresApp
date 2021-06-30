import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { darsenaRedeucer } from './darsenaReducer'
import { lpnReducer } from './lpnReducer'
import { reportesReducer } from './reportesReducer'
import { uiReducer } from './uiReducer'


//este es el reducer que tiene todos los reducers de mi app
export const rootReducer = combineReducers({

    ui: uiReducer,
    reportes: reportesReducer,
    lpn: lpnReducer,
    auth: authReducer,
    darsena: darsenaRedeucer,
})