import { rootReducer } from "../reducers/rootReducer";

import { createStore, applyMiddleware, compose } from 'redux'

//para trabajar actions asincronas 
import thunk from 'redux-thunk';


//para aplicar multiples middlewares || si existen las herramientas de desarrollo redux las configura
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);