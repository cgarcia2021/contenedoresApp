import Swal from "sweetalert2";
import { customFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { startSetCantidadNumerosDeSerie } from "./data";




const successHandle = (respuesta) => {


    return (dispatch) => {


        const lpn = {
            idLpn: respuesta.lpns[0].id,
            nombreLpn: respuesta.lpns[0].nombre,
        };

        dispatch(setActiveLpn(
            lpn
        ));

        dispatch(startSetCantidadNumerosDeSerie());
    }


}


export const startSetLpnActive = (nombreLpn) => {

    return async (dispatch) => {


        //aca hago el await y demas 
        try {
            const resp = await customFetch('lpn/nom', nombreLpn, 'GET');
            const body = await resp.json();

            if (body.ok) {

                dispatch(successHandle(body));

            }
            else {
                throw new Error()
            }
        }
        catch {
            Swal.fire({
                title: 'El lpn no existe, desea crear uno nuevo?',
                showDenyButton: true,
                confirmButtonText: `Crear`,
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(startCreateLpn(nombreLpn));
                    Swal.fire('Creado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Sin cambios', '', 'info')
                }
            })
        }


    }

}

const startCreateLpn = (nombreLpn) => {

    return async (dispatch) => {


        const nuevoLpn = {

            nombre: nombreLpn
        }

        //aca hago el await y demas 
        const resp = await customFetch('lpn/new', nuevoLpn, 'POST');
        const body = await resp.json();

        if (body.ok) {
            dispatch(startSetLpnActive(nuevoLpn.nombre));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}



const setActiveLpn = (lpn) => ({

    type: types.lpnSetActive,
    payload: lpn

})