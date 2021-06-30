import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { datePicker, habilitarStyles, selectStyles } from '../../helpers/clasesMaterialUi';
import { useForm } from '../../hooks/useForm';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import '../../styles/modal.css';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//import { ContenedoresTable } from './ContenedoresTable';
import * as moment from 'moment/moment';
import { startBuscarSerie } from '../../actions/detalles';
import { ContenedoresMaterialTable } from './ContenedoresMaterialTable';

const modalStyles = makeStyles((theme) => ({
    modal: {
        outline: 'none',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: theme.shadows[6],
        padding: theme.spacing(2, 4, 3),
    },
}));


const currentTime = moment(); //esta definida afuera del calendar modal para que no se tenga que calcular siempre






export const ContenedoresModal = () => {


    const { darsenas } = useSelector(state => state.darsena);
    const { lpns } = useSelector(state => state.lpn)





    const modalClasses = modalStyles();

    const selectClasses = selectStyles();

    const datePickerClasses = datePicker();


    const dispatch = useDispatch();

    //para utilizar el estado del modal
    const { modalOpen } = useSelector(state => state.ui);


    const [formReportesValues, handleInputChange] = useForm({
        darsena_id: '',
        lpn_id: '',
    });


    const { darsena_id, lpn_id } = formReportesValues



    const lpn_ref = lpns.find(lpn => lpn.id === lpn_id);



    const [busqueda, setBusqueda] = useState(false);

    const [startDate, setstartDate] = useState(currentTime.toDate());


    const [endDate, setendDate] = useState(currentTime.toDate());



    const closeModal = () => {
        dispatch(uiCloseModal());
    };


    const handleStartChange = (e) => {
        setstartDate(e);
    }

    const handleEndChange = (e) => {
        setendDate(e);
    }


    //para cambiar el valor del form values 
    const handleInputChangeDarsena = ({ target }) => {

        handleInputChange({ target });

    }

    const handleInputChangeLpn = ({ target }) => {

        handleInputChange({ target });

    }

    //----------------------------------------------------BUTTON---------------------------------------
    const handleBuscarButton = () => {

        dispatch(startBuscarSerie(darsena_id, lpn_id, moment(startDate).format('yyyy-MM-DD'), moment(endDate).add(1, 'days').format('yyyy-MM-DD')));
        setBusqueda(true);
    }


    const buscarClasses = habilitarStyles();



    return (
        <div className="div-modal">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={modalClasses.modal}
                open={modalOpen}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade
                    in={modalOpen}
                >

                    <div className="div-modal">
                        <div className={modalClasses.paper}>
                            <h2 id="transition-modal-title">Historial de reportes</h2>
                            <hr />

                            <div className="darsena-modal">

                                <h4>Darsena:</h4>

                                <FormControl className={selectClasses.formControl}>
                                    <InputLabel id="darsena-label">Darsena</InputLabel>
                                    <Select
                                        labelId="darsena-select"
                                        id="darsenaId"
                                        name="darsena_id"
                                        value={darsena_id}
                                        onChange={handleInputChangeDarsena}
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


                            <div className="darsena-modal">

                                <h4>LPN:</h4>

                                <FormControl className={selectClasses.formControl}>
                                    <InputLabel id="lpn-label">LPN</InputLabel>
                                    <Select
                                        labelId="lpn-select"
                                        id="lpnId"
                                        name="lpn_id"
                                        value={lpn_id}
                                        onChange={handleInputChangeLpn}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {

                                            lpns &&
                                            lpns.map((lpn, index) => (
                                                <MenuItem
                                                    value={lpn.id}
                                                    key={index}
                                                > { lpn.nombre} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>Seleccione un LPN...</FormHelperText>
                                </FormControl>
                            </div>



                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container className={datePickerClasses.grid} justify="flex-start">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="startDate-pickers-date"
                                        label="Fecha desde"
                                        format="yyyy/MM/dd"
                                        value={startDate}
                                        onChange={handleStartChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="endDate-pickers-date"
                                        label="Fecha hasta"
                                        format="yyyy/MM/dd"
                                        value={endDate}
                                        onChange={handleEndChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                            <div className="table-serie">

                            </div>

                            {
                                busqueda &&
                                //<ContenedoresTable />
                                <ContenedoresMaterialTable lpn={lpn_ref} />
                            }


                            <Button classes={{

                                root: buscarClasses.root,
                                label: buscarClasses.label,

                            }}
                                onClick={handleBuscarButton}
                                disabled={!(darsena_id && lpn_id)}
                            >
                                buscar
                        </Button>

                        </div>
                    </div>
                </Fade>

            </Modal>
        </div>
    )
}
