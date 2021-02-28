import {Dropdown} from "primereact/dropdown";
import {useDispatch, useSelector} from "react-redux";
import {select} from '../redux/libChooser'
import {useCallback} from "react";
import {createChart} from "../redux/chart";

const libs = [
    {
        name: "ChartJS",
        value: "chartjs"
    },
    {
        name: "Victory",
        value: "victory"
    },
    {
        name: "Recharts",
        value: "recharts"
    },
    {
        name: "Nivo",
        value: "nivo"
    }
]

const Cmp = () => {
    const dispatch = useDispatch();
    const selectedLib = useSelector(state => state.selectedLib.selected)

    const handleChange = useCallback((e) => {
        dispatch(select(e.value));
    }, [dispatch]);

    return (
        <Dropdown
            value={selectedLib}
            options={libs}
            onChange={handleChange}
            optionLabel="name"
            optionValue="value"
            placeholder="Выберите библиотеку"/>
    )
}

export default Cmp