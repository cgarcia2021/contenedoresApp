import { types } from '../types/types'


const initialState = {
    current_search: [],
};



export const reportesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.detalleLoadReportes: {
            return {
                ...state,
                current_search: [...action.payload]
            }
        }
        default:
            return state;
    }
}