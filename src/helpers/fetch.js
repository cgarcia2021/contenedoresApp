const baseUrl = process.env.REACT_APP_CONTENEDORES_URL


const customFetch = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`


    if (method === 'GET') {//si es GET
        if (data) {
            return fetch(url + '?nombre=' + data);
        } else {
            return fetch(url);
        }
    } else {//si es POST

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

}

const getAllDetallesFetch = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`

    if (method === 'GET') {//si es GET
        if (data) {
            return fetch(url + '?iddarsena=' + data.darsenaId + '&idlpn=' + data.lpnId);
        } else {
            return fetch(url);
        }
    } else {//si es POST

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

}

const getAllDetallesBySerie = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`

    if (method === 'GET') {//si es GET
        if (data) {
            return fetch(url + '?iddarsena=' + data.iddarsena + '&idlpn=' + data.idlpn + '&numero_serie=' + data.serie);
        } else {
            return fetch(url);
        }
    } else {//si es POST

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

}


const getSerieHermanado = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`

    if (method === 'GET') {//si es GET
        if (data) {
            return fetch(url + '?numero_serie=' + data.serie);
        } else {
            return fetch(url);
        }
    } else {//si es POST

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

}



const getReportes = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`

    if (method === 'GET') {//si es GET
        if (data) {
            return fetch(url + '?iddarsena=' + data.darsenaId + '&idlpn=' + data.lpnId + '&fecha_desde=' + data.fechaDesde + '&fecha_hasta=' + data.fechaHasta);
        } else {
            return fetch(url);
        }
    } else {//si es POST

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

}





export {

    customFetch,
    getAllDetallesFetch,
    getReportes,
    getAllDetallesBySerie,
    getSerieHermanado
}