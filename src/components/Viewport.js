import MainTopMenu from "../containers/MainTopMenu";
import ChartsPanel from "../containers/ChartsPanel";
import CreateChartWin from "../containers/CreateChartWin";


const component = () => {

    return (
        <div className="p-d-flex p-flex-column p-jc-start full-width-height">
            <MainTopMenu/>
            <ChartsPanel/>
            <CreateChartWin/>
        </div>
    )
}

export default component