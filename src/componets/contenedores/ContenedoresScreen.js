import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import './contenedores.css';
import Button from '@material-ui/core/Button';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useForm } from '../../hooks/useForm';
import { useCounter } from '../../hooks/useCounter';
import { ContenedoresModal } from './ContenedoresModal';
import { habilitarStyles, inputLPNStyles, inputSerieStyles, selectStyles } from '../../helpers/clasesMaterialUi';
import { ReportesButton } from '../../ui/ReportesButton';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingDarsenas, startLoadingLpns, startSetDarsenaActive } from '../../actions/data';
import { startSetLpnActive } from '../../actions/lpn';
import { startAgregarDetalle } from '../../actions/detalles';
import Swal from 'sweetalert2';
import { getAllDetallesBySerie, getSerieHermanado } from '../../helpers/fetch';


export const ContenedoresScreen = () => {


    const dispatch = useDispatch();


    const { darsenas } = useSelector(state => state.darsena);

    const inputLPNClasses = inputLPNStyles();


    const inputSerieClasses = inputSerieStyles();


    const selectClasses = selectStyles();

    const habilitarClasses = habilitarStyles();





    useEffect(() => {

        dispatch(startLoadingDarsenas());
        dispatch(startLoadingLpns());

    }, [dispatch])


    // eslint-disable-next-line no-unused-vars
    const { counter, setCounter, } = useCounter();

    const { cantidadSerie } = useSelector(state => state.lpn)

    const { idLpn } = useSelector(state => state.lpn.activeLpn);
    const { idDarsena } = useSelector(state => state.darsena.activeDarsena);


    //HOOK PARA CONTROLAR EL CONTADOR DEL NUMERO DE SERIE
    useEffect(() => {

        setCounter(cantidadSerie);

    }, [cantidadSerie, setCounter, counter])


    const [formContenedoresValues, handleInputChange, reset] = useForm({
        darsena_id: '',
        lpn: '',
        numeroSerie: '',
    });


    const { darsena_id, lpn, numeroSerie } = formContenedoresValues;

    //state para controlar el largo del LPN
    const [lpnLength, setlpnLenggth] = useState(false);



    //state para controlar si habilitó o no ese LPN
    const [habilitado, setHabilitado] = useState(false);

    //effect para habilitar o desabilitar el boton 
    useEffect(() => {

        if (lpn.length >= 12 && lpn.length <= 20) {
            setlpnLenggth(false);
        } else {
            setlpnLenggth(true);
        }
    }, [setlpnLenggth, lpn])


    //para cambiar el valor del form values y para setear la darsena activa
    const handleInputChangeDarsena = ({ target }) => {


        handleInputChange({ target });

        dispatch(startSetDarsenaActive(target));


    }

    //habilita la lpn para cargarle numeros de serie
    const handleClickHabilitar = () => {

        //aca busco en la DB si existe un lpn y traigo todos los nro de serie que ya tiene asociados
        if (!habilitado) {
            dispatch(startSetLpnActive(lpn));
        }


        setHabilitado(!habilitado); //habilito para ver los nro de serie




    }

    //consulto si el numero de serie ya fue cargado. retorna false si ya lo cargué
    const startConsultaExisteSerie = async (numero_de_serie, idLpn, idDarsena) => {


        return new Promise(async (resolve, reject) => {

            //creo un nuevo objeto para hacer el fetch 
            const data = {
                serie: numero_de_serie,
                iddarsena: idDarsena,
                idlpn: idLpn,
            }


            //aca hago el await y demas 
            const resp = await getAllDetallesBySerie('detalle/serie', data, 'GET');
            const body = await resp.json();


            if (body.ok) {
                resolve(body.existe);
            } else {
                reject(body.existe);
            }


        })
    }

    //consulto si el numero fue hermanado, es decir, que exista fisicamente el equipo
    const startConsultarFueHermanado = async (numero_de_serie) => {

        return new Promise(async (resolve, reject) => {

            //creo un nuevo objeto para hacer el fetch 
            const data = {
                serie: numero_de_serie,
            }


            //aca hago el await y demas 
            const resp = await getSerieHermanado('detalle/hermanado', data, 'GET');
            const body = await resp.json();



            if (body.ok) {
                resolve(body.existe);
            } else {
                reject(body.existe);
            }
        })

    }


    //se ejecuta luego de que escanean un numero de serie
    const handleKeyUp = async (e) => {

        if (e.key === 'Enter' || e.key === 13) {

            const valido = e.target.value.length === 15;

            if (!valido) {
                Swal.fire('Error', 'El número escaneado no es válido', 'error');
            } else {
                //cambio el valor en el formValues
                handleInputChange(e)

                //consulto si ya fue escaneado ese numero de serie
                const cargado = await startConsultaExisteSerie(e.target.value, idLpn, idDarsena);
                //consulto si el numero de serie que escaneo, fue producido (está hermanado)
                const hermanado = await startConsultarFueHermanado(e.target.value);




                if (cargado) {
                    Swal.fire('Error', 'El número de serie ya fue cargado', 'error');
                } else {
                    if (hermanado) {
                        dispatch(startAgregarDetalle(e.target.value));
                    } else {
                        Swal.fire('Error', 'El número de serie no fue hermanado', 'error');
                    }
                }

            }

            //esto es solo para darle un toque mas visual 
            setTimeout(() => {
                reset({
                    darsena_id,
                    lpn,
                    numeroSerie: '',
                })
            }, 1000);


        }

    }



    return (
        <>
            <Navbar />


            <div className="container contenedores-form-1">
                <div className="text-center">
                    <h1>Carga de contenedores</h1>
                </div>
                <hr />

                <form>



                    <div className="darsena-div">

                        <h4>Darsena:</h4>

                        <FormControl className={selectClasses.formControl}>
                            <InputLabel id="darsena-label">Darsena</InputLabel>
                            <Select
                                label="darsena-select"
                                id="darsenaId"
                                name="darsena_id"
                                value={darsena_id}
                                onChange={handleInputChangeDarsena}
                                disabled={habilitado}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {

                                    darsenas &&
                                    darsenas.map((dar) => (
                                        <MenuItem
                                            value={dar.id}
                                            key={dar.id}
                                        > { dar.nombre} </MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>Seleccione una darsena...</FormHelperText>
                        </FormControl>
                    </div>

                    <div className="lpn-div">
                        <h4>LPN:</h4>
                        <TextField
                            id="lpn_id"
                            label="LPN"
                            className={inputLPNClasses.root}
                            name="lpn"
                            value={lpn}
                            onChange={handleInputChange}
                            autoComplete="off"
                            disabled={habilitado}
                        />


                        <Button classes={{

                            root: habilitarClasses.root,
                            label: habilitarClasses.label,
                        }}
                            onClick={handleClickHabilitar}
                            disabled={lpnLength}

                        >
                            {
                                (!habilitado)
                                    ? "habilitar"
                                    : "desbloquear"
                            }
                        </Button>
                    </div>

                    <br />


                    {
                        (habilitado) &&
                        <div className="lpn-div">
                            <h4>Serie:</h4>
                            <TextField
                                id="num_serie"
                                label="Numero de serie"
                                autoComplete="off"
                                className={inputSerieClasses.root}
                                name="numeroSerie"
                                value={numeroSerie}
                                onChange={handleInputChange}
                                onKeyUp={handleKeyUp}
                            />
                        </div>
                    }


                    <hr />


                    <div className="contador-div">
                        <TextField
                            id="standard-read-only-input"
                            label="Contador"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={counter} //el state del counter
                        />

                        <ReportesButton />

                    </div>


                </form>
            </div>

            <ContenedoresModal />

        </>
    )
}
