import {VictoryChart, VictoryBar, VictoryLine, VictoryPie, VictoryTheme} from 'victory';
import {Chart} from 'primereact/chart';
import {getLabels, getNumbers} from '../helpers/chartHelper'
import {getRandomColor} from "../helpers/gridHelper";
// import {Pie, ResponsivePie} from '@nivo/pie'
import {ResponsiveBar} from '@nivo/bar'
import {ResponsiveLine} from '@nivo/line'
import {ResponsivePie} from '@nivo/pie'
import {Pie, PieChart, ResponsiveContainer, Label} from "recharts";
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {LineChart, Line} from 'recharts';

const colorsList = [...new Array(15)].map(() => getRandomColor())

const getNivoChart = ({data, type}) => {

    const responsiveLine = (data) => (
        <ResponsiveLine
            data={[{
                id: 'Города',
                data: data.map((item) => ({x: item.name, y: item.value}))
            }]}
            margin={{top: 50, right: 110, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Города',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Численность',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor'}}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )

    const responsiveBar = (data) => (
        <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="name"
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            padding={0.3}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            colors={{scheme: 'nivo'}}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Города',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Численность',
                legendPosition: 'middle',
                legendOffset: -55
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )

    const responsivePie = (data) => (
        <ResponsivePie
            id={'name'}
            data={data}
            margin={{top: 40, right: 80, bottom: 80, left: 80}}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{scheme: 'nivo'}}
            borderWidth={1}
            borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{from: 'color'}}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )

    switch (type) {
        case 'pie':
            return responsivePie(data)
        case 'line':
            return responsiveLine(data)
        case 'bar':
        default:
            return responsiveBar(data)
    }
}

const getRechartsChart = ({data, type}) => {
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({value, cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy + radius * Math.sin(-midAngle * RADIAN);
return (
            <
text
x = {x}
y = {y}
fill = "white"
textAnchor = {x > cx ? 'start' : 'end'
}
dominantBaseline = "central" >
    {value}
</text>
);
};
switch (type) {
case 'pie':
return (
<PieChart>
<Pie
data={data}
dataKey="value"
nameKey="name"
labelLine={false}
label={renderCustomizedLabel}
>
{
data.map((entry, index) => <Cell fill={colorsList[index]}/>)
}
</Pie>
<Tooltip/>
<Legend layout={'vertical'} align={'right'} verticalAlign={'middle'}/>
</PieChart>
)
case 'line':
return (
<LineChart data={data}>
<Line name="Численность" type="monotone" dataKey="value" stroke="#00BFFF"/>
<CartesianGrid stroke="#ccc"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
</LineChart>
)
case 'bar':
default:
return (
<BarChart data={data}
margin={{top: 5, right: 30, left: 20, bottom: 5}}>
<XAxis type="category" dataKey="name"/>
<YAxis type="number"/>
<Tooltip/>
<Legend/>
<Bar name="Численность" dataKey="value" fill="#00BFFF"/>
</BarChart>
)
}

// return <ResponsiveContainer width={700} height="80%">
//     {/*<PieChart width={730} height={250}>*/}
//         <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
//     {/*</PieChart>*/}
// </ResponsiveContainer>
}

const Cmp = ({data, title, label, type, selectedLib}) => {

switch (selectedLib) {
case 'nivo':
return (
<div className="card" style={{minWidth: 500, height: 350}}>
{getNivoChart({data, type})}
</div>
)
case 'recharts':
return (
<ResponsiveContainer width={300} height={300}>
{getRechartsChart({data, type})}
</ResponsiveContainer>
)
case 'victory':
let chartProps = {
style: {
data: {fill: "#c43a31"},
},
data: data,
x: "name",
y: "value"
}

const getChartByType = () => {
switch (type) {
case 'bar':
return <VictoryBar {...chartProps}/>;
case 'line':
return <VictoryLine {...chartProps}/>
case 'pie':
return <VictoryPie {...chartProps}/>
default:
return <VictoryBar {...chartProps}/>;
}
}

return (
<div className="card" style={{minWidth: 500}}>
<VictoryChart
theme={VictoryTheme.material}
domainPadding={15}
>
{getChartByType()}
</VictoryChart>
</div>
)
default: {
let options = {
title: {
display: true,
text: title,
fontSize: 14
},
legend: {
display: type === 'pie',
position: 'right',
align: 'center',
fullWidth: false,
labels: {
fontColor: '#495057'
}
},
// events: ['click'],
onClick: (...args) => {
}
}
const chartData = {
labels: getLabels(data),
datasets: [
{
label: label,
backgroundColor: colorsList,
data: getNumbers(data)
}
]
};

return (
<div className="card" style={{minWidth: 500}}>
<Chart type={type} data={chartData} options={options}/>
</div>
)
}
}
}

export default Cmp