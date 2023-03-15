import React from 'react'
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const pdata = [
    {
        Date: "21/02/2022",
        Value: 50
    },
    {
        Date: "22/02/2022",
        Value: 70
    },
    {
        Date: "23/02/2022",
        Value: 42
    },
    {
        Date: "24/02/2022",
        Value: 65
    },
    {
        Date: "25/02/2022",
        Value: 61
    },
    {
        Date: "26/02/2022",
        Value: 56
    },
    {
        Date: "27/02/2022",
        Value: 58
    },
    {
        Date: "28/02/2022",
        Value: 66
    },
];

class LightChart extends React.Component {
    render() {
        return (
            <div>
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart data={pdata} margin={{ right: 30 }}>
                        <CartesianGrid />
                        <XAxis dataKey="Date" stroke='black'
                            interval={'preserveStartEnd'} />
                        <YAxis stroke='black'></YAxis>
                        <Legend />
                        <Tooltip />
                        <Line dataKey="Value"
                            stroke="red" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}
export default LightChart;