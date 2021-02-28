import {Menubar} from 'primereact/menubar';
import {createChart} from '../redux/chart'
import {removeAllChart} from '../redux/charts'
import {useDispatch} from "react-redux";
import { useCallback } from 'react';
import ChooseChartLib from "../components/ChooseChartLib";
import {Button} from "primereact/button";

const MainTopMenu = () => {
    const dispatch = useDispatch();

    const handleCreateChart = useCallback(() => {
        dispatch(createChart());
    }, [dispatch]);
    const handleRemoveAll = useCallback(() => {
        dispatch(removeAllChart());
    }, [dispatch]);

    const items = [
        {
            label: 'Файл',
            icon: 'pi pi-fw pi-file',
            items:[
                {
                    label:'Создать',
                    command: handleCreateChart,
                    icon:'pi pi-fw pi-plus'
                },
                {
                    label:'Удалить все',
                    command: handleRemoveAll,
                    icon:'pi pi-fw pi-trash'
                }
            ]
        }
    ]

    return (
        <Menubar model={items} end={<ChooseChartLib/>}/>
    )
}

export default MainTopMenu