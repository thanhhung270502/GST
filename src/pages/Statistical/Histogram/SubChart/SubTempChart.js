import { subdataTemp } from '../Data/tempsubdata';
import { useEffect } from 'react';
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

function SubTempChart() {
    var data = subdataTemp;

    useEffect(() => {
    })

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width='100%'>
                <LineChart
                    width={300}
                    height={100}
                    data={data}
                    margin={{
                        top: 25,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <YAxis domain={[0, 40]} axisLine={false} hide />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", paddingTop: "20px", fontWeight: "bold", fontSize: "0.8em" }} />
                    <Line type="monotone" dataKey="value" stroke="#f92121" dot={false} strokeWidth={4} style={{
                        filter: `drop-shadow(0 15px 20px #f92121)`,
                    }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SubTempChart;