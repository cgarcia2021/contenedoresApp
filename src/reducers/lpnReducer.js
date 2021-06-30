import { types } from '../types/types'


const initialState = {
    lpns: [],
    activeLpn: {
        idLpn: '',
        nombre: '',
    },
    cantidadSerie: 0

};



export const lpnReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.lpnSetActive: {
            return {
                ...state,
                activeLpn: action.payload
            }
        }
        case types.lpnSetCantidadSeries: {
            return {
                ...state,
                cantidadSerie: action.payload
            }
        }
        case types.dataStartLoadingLpns: {
            return {
                ...state,
                lpns: action.payload
            }
        }
        default:
            return state;
    }
}





