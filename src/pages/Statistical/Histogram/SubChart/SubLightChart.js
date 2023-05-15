import { subdataLight } from '../Data/lightsubdata';
import { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

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

function SubLightChart() {
    const [data, setData] = useState(subdataLight);
    // console.log(data);

    useEffect(() => {
    })

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer height='100%'>
                <LineChart
                    width={300}
                    height={10}
                    data={data}
                    margin={{
                        top: 25,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <YAxis domain={[0, 4096]} axisLine={false} hide />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", paddingTop: "20px", fontWeight: "bold", fontSize: "0.8em" }} />
                    <Line type="monotone" dataKey="value" stroke="#0092e4" dot={false} strokeWidth={4} style={{
                        filter: `drop-shadow(0 15px 20px #0092e4)`,
                    }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SubLightChart;