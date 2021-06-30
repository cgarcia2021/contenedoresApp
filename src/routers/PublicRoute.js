import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
    isAuthenticacted,
    component: Component,
    ...rest
}) => {





    return (
        <Route {...rest}

            component={(props) => (
                (!isAuthenticacted)
                    ? <Component {...props} /> //si esta autenticado renderizo el componente
                    : <Redirect to="/" /> //sino redirecciona al login 
            )}


        />
    )
}


PublicRoute.propTypes = {

    isAuthenticacted: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired

}