import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'

import '../../styles/navbar.css'

export const Navbar = () => {


    const dispatch = useDispatch()


    const handleLogOut = () => {


        dispatch(startLogout());



    }



    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                Contenedores App
            </span>

            <button
                className='btn btn-outline-danger'
                onClick={handleLogOut}
            >
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir </span>
            </button>

        </div>
    )
}
