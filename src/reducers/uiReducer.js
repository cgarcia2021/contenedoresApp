import { types } from "../types/types";


const inicialState = {

    modalOpen: false,

}


//reducer con lo relacionado con user interface
export const uiReducer = (state = inicialState, action) => {


    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            }


        default:
            return state;
    }

}