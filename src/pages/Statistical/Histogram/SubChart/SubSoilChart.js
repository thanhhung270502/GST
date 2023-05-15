import { subdataSoil } from '../Data/soilsubdata';
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

function SubSoilChart() {
    var data = subdataSoil;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width='100%' height='100%'>
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
                    <YAxis domain={[0, 100]} axisLine={false} hide />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", paddingTop: "20px", fontWeight: "bold", fontSize: "0.8em" }} />
                    <Line type="monotone" dataKey="value" stroke="#ff7c01" dot={false} strokeWidth={4} style={{
                        filter: `drop-shadow(0 15px 20px #ff7c01)`,
                    }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SubSoilChart;