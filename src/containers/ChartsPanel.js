import {connect} from 'react-redux'
import ChartPanel from "./ChartPanel";

const mapStateToProps = (state) => {
    return {
        chartsList: state.charts.items
    };
};

const Cmp = ({chartsList}) => {

    return (
        <div className="p-col p-d-flex p-flex-wrap p-flex-d p-flex-row p-jc-center p-ai-start">
            {chartsList.map((chartData) => <ChartPanel key={chartData.id} chartData={chartData}/>)}
        </div>
    )
}

export default connect(mapStateToProps)(Cmp)