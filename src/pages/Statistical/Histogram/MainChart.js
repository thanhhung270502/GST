import axios from 'axios';
import { useState, useEffect } from 'react';
import { getMainData } from './Data/maindata';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const url = 'http://localhost:4000/climates';

var maindata = getMainData();

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip"
                style={{
                    backgroundColor: "#000000",
                    padding: "5px",
                    border: "1px solid #cccc",
                    fontSize: "1rem",
                    textAlign: "center",
                    fontWeight: "bold"
                }}
            >
                <p className="label"
                    style={{
                        color: "#ffffff",
                        paddingBottom: "5px"
                    }}
                >
                    {`${label}`}
                </p>
                <div style={{ borderRadius: "15px" }}>
                    {payload.map((pld) => (
                        <div style={{ fontSize: "0.8rem", padding: 5 }}>
                            <div style={{ color: pld.fill, marginRight: "5px" }}>{pld.dataKey}: {pld.value}%</div>
                        </div>
                    ))}
                </div>
            </div >
        );
    }
    return null;
};

function MainChart() {

    const [isLoading, setLoading] = useState(true);
    const buildChart = async () => {
        const gettemp = await axios.get(`${url}/temp`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var mean = 0;
                var sum = 0;
                var count = 1;
                var counthours = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] && i === 0) {
                        sum += mean / counthours;
                        maindata[idx] = {
                            "time": notiMonth + '/' + res.data[i].time.split('-')[0],
                            "Temp": (sum / count / 40 * 100).toFixed(0)
                        }
                        if (idx === 1) {
                            maindata[--idx] = {
                                "time": res.data[i].time.split('-')[1] + '/' + res.data[i].time.split('-')[0],
                                "Temp": (Number(res.data[i].value) * 40 / 100).toFixed(0)
                            };
                        }
                    } else if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            mean += Number(res.data[i].value);
                            counthours++;
                            sum += mean / counthours;
                        };
                        maindata[idx] = {
                            "time": notiMonth + '/' + res.data[i + 1].time.split('-')[0],
                            "Temp": (sum / count)
                        }
                        if (i > 0) {
                            notiMonth = res.data[i].time.split('-')[1];
                            notiDate = res.data[i].time.split('T')[0];
                            i++;
                        };
                        sum = 0;
                        mean = 0;
                        count = 1;
                        counthours = 0;
                        idx--;
                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            count++;
                            notiDate = res.data[i].time.split('T')[0];
                            sum += mean / counthours;
                            mean = 0;
                            counthours = 0;
                        }
                        mean += Number(res.data[i].value);
                        counthours++;
                    }
                };
            })
            .catch(function (err) {
                console.log(err);
            });

        const getlight = await axios.get(`${url}/light`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var mean = 0;
                var sum = 0;
                var count = 1;
                var counthours = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] && i === 0) {
                        sum += mean / counthours;
                        maindata[idx].Light = (sum / count / 4096 * 100).toFixed(0);
                        if (idx === 1) {
                            maindata[--idx].Light = (Number(res.data[i].value) * 4096 / 100).toFixed(0);
                        }
                    } else if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            mean += Number(res.data[i].value);
                            counthours++;
                            sum += mean / counthours;
                        };
                        maindata[idx].Light = (sum / count) / 4096 * 100;
                        if (i > 0) {
                            notiMonth = res.data[i].time.split('-')[1];
                            notiDate = res.data[i].time.split('T')[0];
                            i++;
                        };
                        sum = 0;
                        mean = 0;
                        count = 1;
                        counthours = 0;
                        idx--;
                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            count++;
                            notiDate = res.data[i].time.split('T')[0];
                            sum += mean / counthours;
                            mean = 0;
                            counthours = 0;
                        }
                        mean += Number(res.data[i].value);
                        counthours++;
                    }
                };
            })
            .catch(function (err) {
                console.log(err);
            });

        const gethumi = await axios.get(`${url}/humi`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var mean = 0;
                var sum = 0;
                var count = 1;
                var counthours = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] && i === 0) {
                        sum += mean / counthours;
                        maindata[idx].Humid = (sum / count).toFixed(0);
                        if (idx === 1) {
                            maindata[--idx].Humid = (Number(res.data[i].value)).toFixed(0);
                        }
                    } else if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            mean += Number(res.data[i].value);
                            counthours++;
                            sum += mean / counthours;
                        };
                        maindata[idx].Humid = (sum / count).toFixed(0);
                        if (i > 0) {
                            notiMonth = res.data[i].time.split('-')[1];
                            notiDate = res.data[i].time.split('T')[0];
                            i++;
                        };
                        sum = 0;
                        mean = 0;
                        count = 1;
                        counthours = 0;
                        idx--;
                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            count++;
                            notiDate = res.data[i].time.split('T')[0];
                            sum += mean / counthours;
                            mean = 0;
                            counthours = 0;
                        }
                        mean += Number(res.data[i].value);
                        counthours++;
                    }
                };
            })
            .catch(function (err) {
                console.log(err);
            });

        const getsoil = await axios.get(`${url}/soil`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var mean = 0;
                var sum = 0;
                var count = 1;
                var counthours = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] && i === 0) {
                        sum += mean / counthours;
                        maindata[idx].Soil = (sum / count).toFixed(0);
                        if (idx === 1) {
                            maindata[--idx].Soil = (Number(res.data[i].value)).toFixed(0);
                        }
                    } else if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            mean += Number(res.data[i].value);
                            counthours++;
                            sum += mean / counthours;
                        };
                        maindata[idx].Soil = (sum / count).toFixed(0);
                        if (i > 0) {
                            notiMonth = res.data[i].time.split('-')[1];
                            notiDate = res.data[i].time.split('T')[0];
                            i++;
                        };
                        sum = 0;
                        mean = 0;
                        count = 1;
                        counthours = 0;
                        idx--;
                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            count++;
                            notiDate = res.data[i].time.split('T')[0];
                            sum += mean / counthours;
                            mean = 0;
                            counthours = 0;
                        }
                        mean += Number(res.data[i].value);
                        counthours++;
                    }
                };
            })
            .catch(function (err) {
                console.log(err);
            });

        setLoading(false);
    }

    useEffect(() => {
        buildChart();
    });

    if (isLoading) {
        return;
    }

    return (
        <div>
            <BarChart width={600} height={200} data={maindata}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="time"
                    style={{
                        fontSize: '0.8em',
                    }}
                />
                <YAxis ticks={[20, 40, 60, 80, 100]}
                    domain={[0, 100]}
                    interval="preserveStart"
                    style={{
                        fontSize: '0.8em',
                    }}
                />
                <Bar dataKey="Temp" fill="#f92121" />
                <Bar dataKey="Light" fill="#0092e4" />
                <Bar dataKey="Humid" fill="#25b580" />
                <Bar dataKey="Soil" fill="#ff7c01" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent", border: "1px solid #cccc" }} />
            </BarChart>
        </div >
    )
}
export default MainChart;
