import React from 'react';
import './login.css';


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom: 10,
        marginTop: 10,
    },
    label: {
        textTransform: 'capitalize',
    },
});



export const LoginScreen = () => {


    const classes = useStyles();

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({

        username: 'administrad0r',
        password: 'Passwordd'

    });

    const { username, password } = formLoginValues;


    const handleLogin = (e) => {

        e.preventDefault();

        dispatch(startLogin(username, password));


    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name="username"
                                value={username}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleLoginInputChange}
                            />
                        </div>


                        <div className="form-group text-center">
                            <Button classes={{

                                root: classes.root,
                                label: classes.label,

                            }}
                                value="Login"
                                type="submit"
                                onClick={handleLogin}
                            >
                                login
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}