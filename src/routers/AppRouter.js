import React, { useEffect } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { PublicRoute } from '../routers/PublicRoute';
import { PrivateRoute } from '../routers/PrivateRoute';
import { LoginScreen } from '../componets/auth/LoginScreen';
import { ContenedoresScreen } from '../componets/contenedores/ContenedoresScreen';
import { useDispatch, useSelector } from 'react-redux';
import { checkingFinish } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();


    const { checking, username } = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(checkingFinish());//checkeo si esta o no autenticado

    }, [dispatch])


    if (checking) { //si esta true pongo una pantalla de "carga"

        return (

            <h1>Loading...</h1>

        )

    }



    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticacted={!!username} //como es un string lo "convierto" a boleano haciendo doble negacion
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={ContenedoresScreen}
                        isAuthenticacted={!!username}
                    />

                    <Redirect to="/" />


                </Switch>
            </div>
        </Router >
    )
}
