import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {addChart, updateChart} from '../redux/charts'
import {closeWin} from "../redux/chart";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import GridChartData from "../components/GridChartData";
import {updateItem, insertItem, removeItem, getItemIndex} from '../helpers/gridHelper'

const mapStateToProps = (state) => {
    return {
        creating: state.chart.creating,
        record: state.chart.data,
        chartTypes: state.chart.types
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeWin: () => {
            dispatch(closeWin())
        },
        addChart: (data) => {
            dispatch(addChart(data))
        },
        updateChart: (data) => {
            dispatch(updateChart(data))
        }
    }
};

const validate = values => {
    const errors = {}

    const fields = ["type", "title", "label"]
    fields.forEach((field) => {
        if (values && !values[field]) {
            errors[field] = 'Поле обязательно к заполнению'
        }
    })
    return {
        isValid: Object.keys(errors).length === 0 && errors.constructor === Object,
        errors
    }
}

const getErrorMsg = (error, itemID) => {
    let errorMsg = error && error[itemID]
    return errorMsg ? (<small className="p-d-block" style={{color: "red"}}>{errorMsg}</small>) : null
}

const getErrorClass = (error, itemID) => {
    let errorMsg = error && error[itemID]
    return errorMsg ? 'p-invalid' : null
}

const Cmp = ({creating, record, closeWin, chartTypes, addChart, updateChart}) => {

    const [type, setType] = useState((record && record.type) || 'bar')
    const [title, setTitle] = useState((record && record.title) || '')
    const [label, setLabel] = useState((record && record.label) || '')
    const [chartData, setChartData] = useState((record && record.data) || [])
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        setType((record && record.type) || 'bar')
        setTitle((record && record.title) || '')
        setLabel((record && record.label) || '')
        setChartData((record && record.data) || [])
        setErrors(null)
    }, [record]);

    const closeHandler = () => {
        closeWin()
    }

    const okHandler = () => {
        let validated = validate({type, title, label})
        if(!validated.isValid) {
            setErrors(validated.errors)
            return
        }
        if (creating)
            addChart({
                type,
                title,
                label,
                data: chartData.data
            })
        else
            updateChart({
                id: record.id,
                type,
                title,
                label,
                data: chartData
            })
        closeWin()
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Закрыть" icon="pi pi-times" onClick={closeHandler} className="p-button-text"/>
                <Button label="ОК" icon="pi pi-check" onClick={okHandler} autoFocus/>
            </div>
        );
    }

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'type':
                setType(e.target.value)
                break
            case 'title':
                setTitle(e.target.value)
                break
            case 'label':
                setLabel(e.target.value)
                break
            case 'data':
                setChartData(e.target.value)
                break
            default:
                return;
        }
    }

    return (
        <Dialog header={(creating && 'Создание диаграммы') || (record && record.title)} visible={!!(creating || record)}
                maximizable modal style={{width: '50vw'}} footer={renderFooter('displayMaximizable')}
                onHide={closeHandler}>
            <div className="p-fluid p-d-flex p-flex-column full-width-height">
                <div className="p-field p-grid">
                    <label className="p-col-12 p-md-2">Наименование</label>
                    <div className="p-col-12 p-md-10">
                        <InputText className={getErrorClass(errors, "title")} name="title" value={title} onChange={changeHandler} type="text"/>
                        {getErrorMsg(errors, "title")}
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label className="p-col-12 p-md-2">Лейбел</label>
                    <div className="p-col-12 p-md-10">
                        <InputText className={getErrorClass(errors, "label")} name="label" value={label} onChange={changeHandler} type="text"/>
                        {getErrorMsg(errors, "label")}
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label className="p-col-12 p-md-2">Тип диаграммы</label>
                    <div className="p-col-12 p-md-10">
                        <Dropdown className={getErrorClass(errors, "type")} optionLabel="name" value={type} optionValue="value" name="type" options={chartTypes}
                                  onChange={changeHandler} placeholder="Выберите тип диаграммы"/>
                        {getErrorMsg(errors, "type")}
                    </div>
                </div>
                <GridChartData
                    data={chartData}
                    setData={setChartData}
                    removeRecordHandler={(record) => {
                        setChartData(removeItem(chartData, {index: getItemIndex(chartData, record)}))
                    }}
                    addRecordHandler={(record) => {
                        setChartData(insertItem(chartData, {index: 0, item: {name: '', value: ''}}))
                    }}
                    updateRecordHandler={(record) => {
                        setChartData(updateItem(chartData,
                            {
                                index: getItemIndex(chartData, record),
                                item: record
                            }))
                    }}
                />
            </div>
        </Dialog>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cmp)
