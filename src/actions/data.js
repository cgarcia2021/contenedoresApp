import Swal from "sweetalert2";
import { types } from "../types/types";
import { customFetch, getAllDetallesFetch } from "../helpers/fetch";



export const startLoadingDarsenas = () => {


    return async (dispatch) => {

        //aca hago el await y demas 
        const resp = await customFetch('dar/darsenas', 'GET');
        const body = await resp.json();

        if (body.ok) {

            dispatch(loadData(
                body.darsenas
            ));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }


}


const loadLpns = (lpns) => ({
    type: types.dataStartLoadingLpns,
    payload: lpns
})


export const startLoadingLpns = () => {

    return async (dispatch) => {

        //aca hago el await y demas 
        const resp = await customFetch('lpn', 'GET');
        const body = await resp.json();

        if (body.ok) {

            dispatch(loadLpns(
                body.lpns
            ));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }


}


const setActiveDarsena = (darsena) => ({

    type: types.darsenaSetActive,
    payload: darsena

})

export const startSetDarsenaActive = (target) => {


    const darsena = {
        idDarsena: target.value
    }

    return (dispatch) => {

        dispatch(setActiveDarsena(darsena));


    }

}


export const setCantidadNumerosDeSerie = (cantidad) => ({

    type: types.lpnSetCantidadSeries,
    payload: cantidad

})



export const startSetCantidadNumerosDeSerie = () => {

    return async (dispatch, getState) => {

        const { idLpn } = getState().lpn.activeLpn;
        const { idDarsena } = getState().darsena.activeDarsena;


        const data = {
            darsenaId: idDarsena,
            lpnId: idLpn
        }

        //aca hago el await y demas 
        const resp = await getAllDetallesFetch('detalle', data, 'GET');
        const body = await resp.json();


        if (body.ok) {
            if (body.cantidad > 0) {
                Swal.fire({
                    title: 'Desea cargar mas series sobre ese LPN?',
                    showDenyButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        dispatch(setCantidadNumerosDeSerie(body.cantidad));
                        Swal.fire('', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('', '', 'info')
                    }
                })
            }
        } else {
            Swal.fire('Error', body.msg, 'info');
            dispatch(setCantidadNumerosDeSerie(0));
            dispatch(startLoadingLpns());
        }

    }

}



const loadData = (darsenas) => ({

    type: types.dataStartLoading,
    payload: darsenas

})


