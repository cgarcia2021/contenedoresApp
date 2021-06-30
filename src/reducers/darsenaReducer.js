import { types } from '../types/types'


const initialState = {

    darsenas: [],
    activeDarsena: {
        idDarsena: '',
    },

};



export const darsenaRedeucer = (state = initialState, action) => {

    switch (action.type) {

        case types.dataStartLoading: {
            return {
                ...state,
                darsenas: [...action.payload]
            }
        }

        case types.darsenaSetActive: {
            return {
                ...state,
                activeDarsena: action.payload
            }
        }
        default:
            return state;
    }
}