import axios from 'axios';
import { useState, useEffect } from 'react';
import { getMainData } from './Data/maindata';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getCookie } from '~/api/cookie';

const garden_id = getCookie('garden_id');
// const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}`;

var maindata = getMainData();

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: '#000000',
                    padding: '5px',
                    border: '1px solid #cccc',
                    fontSize: '1rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                <p
                    className="label"
                    style={{
                        color: '#ffffff',
                        paddingBottom: '5px',
                    }}
                >
                    {`${label}`}
                </p>
                <div style={{ borderRadius: '15px' }}>
                    {payload.map((pld) => (
                        <div style={{ fontSize: '0.8rem', padding: 5 }}>
                            <div style={{ color: pld.fill, marginRight: '5px' }}>
                                {pld.dataKey}: {pld.value}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

function MainChart() {
    const [isLoading, setLoading] = useState(true);
    const buildChart = async () => {
        const gettemp = await axios
            .get(`${url}/temp`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var meanHour = 0;
                var meanDate = 0;
                var meanMonth = 0;
                var countHour = 0;
                var countDate = 0;
                var countMonth = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            if (notiDate !== res.data[i].time.split('T')[0]) {
                                meanMonth += Number(res.data[i].value);
                            } else {
                                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                    meanDate += Number(res.data[i].value);
                                    countDate++;
                                } else {
                                    meanHour += Number(res.data[i].value);
                                    countHour++;
                                };
                                meanDate += meanHour / countHour;
                                countDate++;
                            };
                        };

                        meanMonth += meanDate / countDate;
                        countMonth++;
                        maindata[idx] = {};
                        maindata[idx].Temp = ((meanMonth / countMonth) / 40 * 100).toFixed(2);
                        notiMonth = res.data[i].time.split('-')[1];
                        notiDate = res.data[i].time.split('T')[0];
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                        countDate = 0;
                        countHour = 0;
                        meanDate = 0;
                        meanHour = 0;
                        idx--;
                        if (i !== 0) {
                            i++;
                        }

                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            meanDate += meanHour / countHour;
                            countDate++;
                            meanMonth += meanDate / countDate;
                            countMonth++;
                            notiDate = res.data[i].time.split('T')[0];
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            countDate = 0;
                            meanDate = 0;
                            meanHour = Number(res.data[i].value);
                            countHour = 1;
                        } else {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                meanDate += meanHour / countHour;
                                notiHours = res.data[i].time.split('T')[1].split(':')[0];
                                meanHour = Number(res.data[i].value);
                                countHour = 1;
                                countDate++;
                            } else {
                                meanHour += Number(res.data[i].value);
                                countHour++;
                            }
                        }
                    };
                }
            })
            .catch(function (err) {
                console.log(err);
            });

        const getlight = await axios
            .get(`${url}/light`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var meanHour = 0;
                var meanDate = 0;
                var meanMonth = 0;
                var countHour = 0;
                var countDate = 0;
                var countMonth = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            if (notiDate !== res.data[i].time.split('T')[0]) {
                                meanMonth += Number(res.data[i].value);
                            } else {
                                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                    meanDate += Number(res.data[i].value);
                                    countDate++;
                                } else {
                                    meanHour += Number(res.data[i].value);
                                    countHour++;
                                };
                                meanDate += meanHour / countHour;
                                countDate++;
                            };
                        };

                        meanMonth += meanDate / countDate;
                        countMonth++;
                        maindata[idx].Light = ((meanMonth / countMonth) / 4096 * 100).toFixed(2);
                        notiMonth = res.data[i].time.split('-')[1];
                        notiDate = res.data[i].time.split('T')[0];
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                        countDate = 0;
                        countHour = 0;
                        meanDate = 0;
                        meanHour = 0;
                        idx--;
                        if (i !== 0) {
                            i++;
                        }

                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            meanDate += meanHour / countHour;
                            countDate++;
                            meanMonth += meanDate / countDate;
                            countMonth++;
                            notiDate = res.data[i].time.split('T')[0];
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            countDate = 0;
                            meanDate = 0;
                            meanHour = Number(res.data[i].value);
                            countHour = 1;
                        } else {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                meanDate += meanHour / countHour;
                                notiHours = res.data[i].time.split('T')[1].split(':')[0];
                                meanHour = Number(res.data[i].value);
                                countHour = 1;
                                countDate++;
                            } else {
                                meanHour += Number(res.data[i].value);
                                countHour++;
                            }
                        }
                    };
                }
            })
            .catch(function (err) {
                console.log(err);
            });

        const gethumi = await axios
            .get(`${url}/humi`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var meanHour = 0;
                var meanDate = 0;
                var meanMonth = 0;
                var countHour = 0;
                var countDate = 0;
                var countMonth = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            if (notiDate !== res.data[i].time.split('T')[0]) {
                                meanMonth += Number(res.data[i].value);
                            } else {
                                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                    meanDate += Number(res.data[i].value);
                                    countDate++;
                                } else {
                                    meanHour += Number(res.data[i].value);
                                    countHour++;
                                };
                                meanDate += meanHour / countHour;
                                countDate++;
                            };
                        };

                        meanMonth += meanDate / countDate;
                        countMonth++;
                        maindata[idx].Humid = (meanMonth / countMonth).toFixed(2);
                        notiMonth = res.data[i].time.split('-')[1];
                        notiDate = res.data[i].time.split('T')[0];
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                        countDate = 0;
                        countHour = 0;
                        meanDate = 0;
                        meanHour = 0;
                        idx--;
                        if (i !== 0) {
                            i++;
                        }

                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            meanDate += meanHour / countHour;
                            countDate++;
                            meanMonth += meanDate / countDate;
                            countMonth++;
                            notiDate = res.data[i].time.split('T')[0];
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            countDate = 0;
                            meanDate = 0;
                            meanHour = Number(res.data[i].value);
                            countHour = 1;
                        } else {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                meanDate += meanHour / countHour;
                                notiHours = res.data[i].time.split('T')[1].split(':')[0];
                                meanHour = Number(res.data[i].value);
                                countHour = 1;
                                countDate++;
                            } else {
                                meanHour += Number(res.data[i].value);
                                countHour++;
                            }
                        }
                    };
                }
            })
            .catch(function (err) {
                console.log(err);
            });

        const getsoil = await axios
            .get(`${url}/soil`)
            .then(function (res) {
                var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
                var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
                if (idx > 2) {
                    idx = 2;
                };
                var meanHour = 0;
                var meanDate = 0;
                var meanMonth = 0;
                var countHour = 0;
                var countDate = 0;
                var countMonth = 0;
                for (var i = res.data.length - 1; i >= 0; i--) {
                    if (idx === -1) {
                        break;
                    };
                    if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                        if (i === 0) {
                            if (notiDate !== res.data[i].time.split('T')[0]) {
                                meanMonth += Number(res.data[i].value);
                            } else {
                                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                    meanDate += Number(res.data[i].value);
                                    countDate++;
                                } else {
                                    meanHour += Number(res.data[i].value);
                                    countHour++;
                                };
                                meanDate += meanHour / countHour;
                                countDate++;
                            };
                        };

                        meanMonth += meanDate / countDate;
                        countMonth++;
                        maindata[idx].Soil = (meanMonth / countMonth).toFixed(2);
                        notiMonth = res.data[i].time.split('-')[1];
                        notiDate = res.data[i].time.split('T')[0];
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                        countDate = 0;
                        countHour = 0;
                        meanDate = 0;
                        meanHour = 0;
                        idx--;
                        if (i !== 0) {
                            i++;
                        }

                    } else {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            meanDate += meanHour / countHour;
                            countDate++;
                            meanMonth += meanDate / countDate;
                            countMonth++;
                            notiDate = res.data[i].time.split('T')[0];
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            countDate = 0;
                            meanDate = 0;
                            meanHour = Number(res.data[i].value);
                            countHour = 1;
                        } else {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                meanDate += meanHour / countHour;
                                notiHours = res.data[i].time.split('T')[1].split(':')[0];
                                meanHour = Number(res.data[i].value);
                                countHour = 1;
                                countDate++;
                            } else {
                                meanHour += Number(res.data[i].value);
                                countHour++;
                            }
                        }
                    };
                }
            })
            .catch(function (err) {
                console.log(err);
            });

        setLoading(false);
    };

    useEffect(() => {
        buildChart();
    });

    if (isLoading) {
        return;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width="100%" data={maindata}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis
                        dataKey="time"
                        style={{
                            fontSize: '0.8em',
                        }}
                    />
                    <YAxis
                        ticks={[20, 40, 60, 80, 100]}
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
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent', border: '1px solid #cccc' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export default MainChart;
