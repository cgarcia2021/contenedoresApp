import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { habilitarStyles } from '../helpers/clasesMaterialUi';
import { uiOpenModal } from '../actions/ui';


export const ReportesButton = () => {


    const dispatch = useDispatch();


    const handleModalOpen = () => {

        dispatch(uiOpenModal()); //hago el dispatch para abrir el modal


    }

    const habilitarClasses = habilitarStyles();

    return (
        <Button classes={{

            root: habilitarClasses.root,
            label: habilitarClasses.label,

        }}
            onClick={handleModalOpen}
        >
            ver reportes
        </Button>
    )
}
