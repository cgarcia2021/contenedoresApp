import { makeStyles } from "@material-ui/core";

export const habilitarStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
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


export const inputLPNStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginTop: 0,
        marginBottom: 5,
        width: '100%',
        maxWidth: 300,


    },
}));


export const inputSerieStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 112,
        width: '100%',
        maxWidth: 300,


    },
}));


export const datePicker = makeStyles({
    grid: {
        width: '60%',
    },
});

export const selectStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        marginTop: 0,
        marginBottom: 5,
        minWidth: 300,
        maxWidth: 400,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export const tableStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));