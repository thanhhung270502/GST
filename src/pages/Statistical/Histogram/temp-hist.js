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
        Value: 21
    },
    {
        Date: "22/02/2022",
        Value: 22
    },
    {
        Date: "23/02/2022",
        Value: 14
    },
    {
        Date: "24/02/2022",
        Value: 18
    },
    {
        Date: "25/02/2022",
        Value: 20
    },
    {
        Date: "26/02/2022",
        Value: 21
    },
    {
        Date: "27/02/2022",
        Value: 27
    },
    {
        Date: "28/02/2022",
        Value: 22
    },
];

class TempChart extends React.Component {
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
                            stroke="black" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}
export default TempChart;