import { customFetch, getReportes } from "../helpers/fetch";
import { setCantidadNumerosDeSerie } from "../actions/data";
import { types } from '../types/types'
import Swal from "sweetalert2";



export const startAgregarDetalle = (numero_de_serie) => {

    return async (dispatch, getState) => {

        const { idLpn } = getState().lpn.activeLpn;
        const { idDarsena } = getState().darsena.activeDarsena;
        const { cantidadSerie } = getState().lpn;

        //creo un nuevo objeto para hacer el fetch 
        const data = {
            serie: numero_de_serie,
            iddarsena: idDarsena,
            idlpn: idLpn,
        }


        //aca hago el await y demas 
        const resp = await customFetch('detalle/new', data, 'POST');
        const body = await resp.json();


        if (body.ok) {

            const nuevaCantidad = cantidadSerie + 1;

            dispatch(setCantidadNumerosDeSerie(nuevaCantidad))

        } else {
            Swal.fire('Error', 'El código escaneado no corresponde a un número de serie.', 'error');
        }

    }


}


export const startBuscarSerie = (darsena_id, lpn_id, fecha_desde, fecha_hasta) => {

    return async (dispatch) => {

        //creo un nuevo objeto para hacer el fetch 
        const data = {
            darsenaId: darsena_id,
            lpnId: lpn_id,
            fechaDesde: fecha_desde,
            fechaHasta: fecha_hasta
        }


        //aca hago el await y demas 
        const resp = await getReportes('detalle/reporte', data, 'GET');
        const body = await resp.json();



        if (body.ok) {

            dispatch(loadReporte(
                body.num_series
            ));
        }
    }
}

const loadReporte = (num_series) => ({
    type: types.detalleLoadReportes,
    payload: num_series
})