import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

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
    const pdata = [
        {
            created_at: "21/02/2022",
            value: 23
        },
        {
            created_at: "22/02/2022",
            value: 22
        },
        {
            created_at: "23/02/2022",
            value: 14
        },
        {
            created_at: "24/02/2022",
            value: 18
        },
        {
            created_at: "25/02/2022",
            value: 20
        },
        {
            created_at: "26/02/2022",
            value: 21
        },
        {
            created_at: "27/02/2022",
            value: 27
        },
        {
            created_at: "28/02/2022",
            value: 22
        },
    ];
    const [data, setData] = useState(pdata);
    console.log(data);

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_frSn91BqMRRjfVRKqU3ql28RIq7c';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
    let lastTimestamp = 0;
    let timeoutId = null;
    let messagePrinted = false;

    const url = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';

    const aioKey = 'aio_FwnL44zQBHuJwgICmM3ZGIqTHDMg';



    // useEffect(() => {
    //     fetch(url, {
    //         headers: {
    //             'X-AIO-Key': aioKey,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setData(data);
    //         })
    //         .catch((error) => console.log(error));
    // }, [])

    return (
        <div >
            <ResponsiveContainer width="100%" aspect={2} >
                <AreaChart
                    width={650}
                    height={500}
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <defs>
                        <linearGradient id="colorUvTC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#EF0107" stopOpacity={0.8} />
                            <stop offset="90%" stopColor="#EF0107" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPvTC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="created_at" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
                    <Area type="monotone" dataKey="value" stroke="#D9D9D9" fill="url(#colorUvTC)" fillOpacity={1} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TempChart;
