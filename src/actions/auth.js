import Swal from "sweetalert2";
import { customFetch } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (username, password) => {

    return async (dispatch) => {

        //aca hago el await y demas 
        const resp = await customFetch('auth/login', { username, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            dispatch(login({
                username: body.username
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }

};


export const startLogout = () => {

    return (dispatch) => {
        dispatch(logout());
    }

}



const login = (user) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({
    type: types.authLogout,
});



export const checkingFinish = () => ({

    type: types.authCheckingFinish

})