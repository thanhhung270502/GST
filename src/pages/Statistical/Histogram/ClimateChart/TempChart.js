import { dataJson } from '../Data/data';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

var pdata = dataJson();
export var Tempdata = pdata;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

function TempChart() {
    const [data, setData] = useState(pdata);
    // console.log(data);

    useEffect(() => {

    })

    return (
        <div className='TempChart'>
            <div className='legend__temp'>
                <div>
                    <div></div>
                    <p>Temperature</p>
                </div>
            </div>
            <ResponsiveContainer width="100%">
                <AreaChart
                    width={1500}
                    height={400}
                    data={data}
                    margin={{
                        top: 50,
                        right: 40,
                        left: 0,
                        bottom: 30,
                    }}
                >

                    <defs>
                        <linearGradient id="colorUvHC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#f92121" stopOpacity={0.8} />
                            <stop offset="90%" stopColor="#f92121" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPvHC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                        ticks={[10, 20, 30, 40]}
                        domain={[0, 40]}
                    />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", fontWeight: "bold" }} />
                    <Area type="monotone" dataKey="value" stroke="#D9D9D9" fill="url(#colorUvHC)" fillOpacity={1} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TempChart;