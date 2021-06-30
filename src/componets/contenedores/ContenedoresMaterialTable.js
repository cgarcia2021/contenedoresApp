import MaterialTable from 'material-table'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

export const ContenedoresMaterialTable = ({ lpn }) => {

    const tableRef = useRef();

    const { current_search } = useSelector(state => state.reportes);
    const [render, setRender] = useState(false);

    function createData(numero_serie) {
        return {
            serie: numero_serie.serie,
            fecha_hora: moment(numero_serie.fecha_hora).add(3, 'hours').format('YYYY-MM-DD, hh:mm:ss a'),
        };
    }

    const [rows, setRows] = useState([])
    const columnas = [
        { title: 'Numero de Serie', field: 'serie' },
        { title: 'Fecha y hora', field: 'fecha_hora' },
    ];

    useEffect(() => {

        let rowsAux = [];
        current_search.map((num_ser) => (
            rowsAux.push(createData(num_ser))
        ))

        setRows(rowsAux);


        if (rowsAux.length > 0) {
            setRender(true)
        }



    }, [current_search, render, setRows]);


    const downloadCsv = (data, fileName) => {
        const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
        a.setAttribute("download", finalFileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }




    return (
        <>
            <MaterialTable
                title="Numeros de serie"
                tableRef={tableRef}
                columns={columnas}
                data={rows}
                options={{
                    exportButton: true,
                    exportCsv: (columns, data) => {
                        // Turn headers into array of strings
                        const headerRow = columns.map(col => {
                            if (typeof col.title === 'object') {
                                // I am not sure what props the Translate component exposes
                                // but you would need to change `text` in `col.title.props.text`
                                // to whatever prop you need.
                                return col.title.props.text;
                            }
                            return col.title;
                        });

                        // Turn data into an array of string arrays, without the `tableData` prop
                        const dataRows = data.map(({ tableData, ...row }) => Object.values(row));
                        // Aggregate header data and 'body' data
                        // Mirror default export behavior by joining data via 
                        // the delimiter specified within material table (by default comma delimited)
                        const { exportDelimiter } = tableRef.current?.props.options;
                        const delimiter = exportDelimiter ? exportDelimiter : ";";
                        const csvContent = [headerRow, ...dataRows].map(e => e.join(delimiter)).join("\n");

                        // This mirrors the default export behavior where the 
                        // exported file name is the table title.
                        const csvFileName = `Lpn ${lpn.nombre}`;

                        // Allow user to download file as .csv
                        downloadCsv(csvContent, csvFileName);
                    }

                }}
            />
        </>
    )
}
