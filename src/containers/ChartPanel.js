import {Card} from 'primereact/card';
import {Button} from "primereact/button";
import {confirmDialog} from 'primereact/confirmdialog'
import {removeChart} from "../redux/charts";
import {editChart} from "../redux/chart";
import {connect} from "react-redux";
import ChartComponent from "../components/ChartComponent";

const mapDispatchToProps = (dispatch) => {
    return {
        removeChart: (id) => {
            dispatch(removeChart(id))
        },
        editChart: (record) => {
            dispatch(editChart(record))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        selectedLib: state.selectedLib.selected
    };
};

const Cmp = ({chartData, removeChart, editChart, selectedLib}) => {
    const getChart = (chartData) => {
        return <ChartComponent
            data={chartData.data}
            title={chartData.title}
            label={chartData.label}
            type={chartData.type}
            selectedLib={selectedLib}
        />
    }

    const footer = (
        <>
            <Button
                onClick={() => editChart(chartData)}
                tooltip={"Редактировать"}
                icon="pi pi-cog"
                className="p-button-rounded p-button-secondary p-ml-auto"/>
            <Button
                onClick={() => confirmDialog({
                    message: 'Вы действительно хотите удалить диаграмму?',
                    header: 'Удаление диаграммы',
                    icon: 'pi pi-info-circle',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Да',
                    rejectLabel: 'Нет',
                    accept: () => removeChart(chartData.id)
                })}
                tooltip={"Удалить"}
                icon="pi pi-times"
                className="p-button-rounded p-button-danger"
                style={{marginLeft: '.25em'}}/>
        </>);

    return (
        <Card className="chart-item p-m-2" footer={footer}>
            {getChart(chartData)}
        </Card>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cmp)