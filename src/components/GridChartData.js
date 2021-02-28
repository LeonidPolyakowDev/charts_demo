// import {DataGrid} from '@material-ui/data-grid';
import {DataTable} from 'primereact/datatable'
import {confirmDialog} from 'primereact/confirmdialog'
import {Column} from 'primereact/column'
import {connect} from "react-redux"
import {InputText} from 'primereact/inputtext';
import '../index.css'
import {Button} from "primereact/button";
import PropTypes from 'prop-types'
import chartData from "../redux/chartData";
import {useEffect, useState} from "react";
import {removeItem} from '../helpers/gridHelper';

const _ld = require('lodash');


const Cmp = ({data, setData, selectRecordHandler, removeRecordHandler, addRecordHandler}) => {

    const [originalRow, setOriginalRow] = useState({})
    const [newRecord, setNewRecord] = useState(false)

    useEffect(() => {
        if(newRecord) {
            editFirst()
            setNewRecord(false)
        }
    }, [data]);

    const onEditorValueChange = (props, value) => {
        let updatedItems = [...props.value]
        updatedItems[props.rowIndex][props.field] = value
        setData(updatedItems)
    }

    const inputTextEditor = (props, field) => {
        return <InputText
            type="text"
            value={props.rowData[field]}
            onChange={(e) => onEditorValueChange(props, e.target.value)}
        />;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    }

    const valueEditor = (props) => {
        return inputTextEditor(props, 'value');
    }

    const columns = [
        {field: 'name', headerName: 'Наименование', width: 200, editor: nameEditor},
        {field: 'value', headerName: 'Значение', editor: valueEditor}
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column
            key={col.field}
            field={col.field}
            header={col.headerName}
            editor={col.editor}
            sortable
        />
    })

    const rowSelectHandler = ({data}) => {
        selectRecordHandler && selectRecordHandler(data)
    }

    const removeActionBodyTemplate = (record) => {
        return (
            <Button
                onClick={() => confirmDialog({
                    message: 'Вы действительно хотите удалить запись?',
                    header: 'Удаление записи',
                    icon: 'pi pi-info-circle',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Да',
                    rejectLabel: 'Нет',
                    accept: () => removeRecordHandler && removeRecordHandler(record)
                })}
                type="button"
                icon="pi pi-times"
                tooltip="Удалить запись"
                tooltipOptions={{position: 'left'}}
                className="p-button-secondary p-button-danger p-button-sm"/>
        );
    }

    const addActionBodyTemplate = () => {
        return (
            <Button
                onClick={() => {
                    closeAll()
                    setNewRecord(true)
                    addRecordHandler()
                }}
                type="button"
                icon="pi pi-plus"
                tooltip="Создать запись"
                tooltipOptions={{position: 'left'}}
                className="p-button-secondary p-button-success p-button-sm"/>
        );
    }

    const closeAll = () => {
        let buttons = document.getElementsByClassName('p-row-editor-cancel p-link')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].click()
        }
    }

    const editFirst = () => {
        let buttons = document.getElementsByClassName('p-row-editor-init p-link')
        buttons.length &&  buttons[0].click()
    }

    const onRowEditInit = (event) => {
        closeAll()
        setOriginalRow({
            ...originalRow, [event.index]: {
                data: {...data[event.index]},
                event: event
            }
        });
    }

    const onRowEditCancel = (event) => {
        let items = [...data];
        let originRecord = originalRow[event.index].data;
        if (_ld.values(originRecord).every(_ld.isEmpty)) {
            setData(removeItem(data, {index: event.index}))
        } else {
            items[event.index] = originRecord;
            setData(items);
        }
    }

    return (
        <DataTable
            editMode="row"
            value={data}
            onRowSelect={rowSelectHandler}
            style={{height: '100%'}}
            selectionMode="single"
            onRowEditInit={onRowEditInit}
            onRowEditCancel={onRowEditCancel}
        >
            {dynamicColumns}
            <Column
                rowEditor
            />
            <Column
                body={removeActionBodyTemplate}
                header={addActionBodyTemplate()}
                headerStyle={{width: '8em', textAlign: 'center'}}
                bodyStyle={{textAlign: 'center', overflow: 'visible'}}/>
        </DataTable>
    );
}

Cmp.propTypes = {
    data: PropTypes.array,
    removeRecordHandler: PropTypes.func.isRequired,
    addRecordHandler: PropTypes.func.isRequired
}

export default Cmp