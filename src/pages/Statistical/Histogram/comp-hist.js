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
        Value1: 5,
        Value2: 10
    },
    {
        Date: "22/02/2022",
        Value1: 10,
        Value2: 8
    },
    {
        Date: "23/02/2022",
        Value1: 23,
        Value2: 18
    },
    {
        Date: "24/02/2022",
        Value1: 17,
        Value2: 16
    },
    {
        Date: "25/02/2022",
        Value1: 18,
        Value2: 24
    },
    {
        Date: "26/02/2022",
        Value1: 9,
        Value2: 13
    },
    {
        Date: "27/02/2022",
        Value1: 11,
        Value2: 16
    },
    {
        Date: "28/02/2022",
        Value1: 27,
        Value2: 24
    },
];

class CompChart extends React.Component {
    render() {
        return (
            <div>
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart data={pdata} margin={{ right: 50 }}>
                        <CartesianGrid />
                        <XAxis dataKey="Date" stroke='black'
                            interval={'preserveStartEnd'} />
                        <YAxis stroke='black'></YAxis>
                        <Legend />
                        <Tooltip />
                        <Line dataKey="Value1"
                            stroke="black" activeDot={{ r: 8 }} />
                        <Line dataKey="Value2"
                            stroke="red" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}
export default CompChart;