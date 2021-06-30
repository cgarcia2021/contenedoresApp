import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({
    isAuthenticacted,
    component: Component,
    ...rest
}) => {





    return (
        <Route {...rest}

            component={(props) => (
                (isAuthenticacted)
                    ? <Component {...props} /> //si esta autenticado renderizo el componente
                    : <Redirect to="/login" /> //sino redirecciona al login 
            )}


        />
    )
}


PrivateRoute.propTypes = {

    isAuthenticacted: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired

}