import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter'
import moment from 'moment'




export const ContenedoresApp = () => {

    moment.locale('es-ar');
    return (
        <Provider store={store}>

            <AppRouter />

        </Provider>

    )
}
