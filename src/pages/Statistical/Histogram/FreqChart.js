import axios from 'axios';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getFreqData } from './Data/freqdata.js';
import { getCookie } from '~/api/cookie.js';

const garden_id = getCookie('garden_id');
// const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/history/${garden_id}`;

var freqdata = getFreqData();

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: "#ffff",
                    padding: "5px",
                    border: "1px solid #cccc",
                }}
            >
                <label>{`${payload[0].name} : ${payload[0].value}%`} </label>
            </div>
        );
    }
    return null;
};

function FreqChart() {
    const COLORS = ["#f92121", "#0092e4", "#25b580", "#ff7c01"];

    const [isLoading, setLoading] = useState(true);

    const getChart = async () => {
        const freqChart = await axios.get(`${url}`)
            .then(function (res) {
                var countTemp = 0;
                var countLight = 0;
                var countHumid = 0;
                var countSoil = 0;

                var idx = res.data.length > 10 ? 9 : res.data.length - 1;
                for (var i = res.data.length - 1; i >= res.data.length - 1 - idx; i--) {
                    switch (res.data[i].activity.split(' ')[3]) {
                        case 'fan':
                            countTemp++;
                            break;
                        case 'led':
                            countLight++;
                            break;
                        case 'pump':
                            countHumid++;
                            countSoil++;
                            break;
                        default:
                            break;
                    }
                };
                freqdata[0] = {
                    name: 'Temperature',
                    value: countTemp / (idx + 1) * 100
                };
                freqdata[1] = {
                    name: 'Light',
                    value: countLight / (idx + 1) * 100
                };
                freqdata[2] = {
                    name: 'Humid',
                    value: countHumid / (idx + 1) * 100
                };
                freqdata[3] = {
                    name: 'Soil Moisture',
                    value: countSoil / (idx + 1) * 100
                }
                setLoading(false);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        getChart();
    });

    if (isLoading) {
        return;
    }

    return (
        <div className='test'>
            <PieChart width={200} height={200}>
                <Pie data={freqdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#82ca9d">
                    {freqdata.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </div >
    )
}

export default FreqChart;