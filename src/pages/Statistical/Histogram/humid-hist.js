import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

function HumidChart() {
    const pdata = [
        {
            Date: "21/02/2022",
            Value: 50
        },
        {
            Date: "22/02/2022",
            Value: 70
        },
        {
            Date: "23/02/2022",
            Value: 42
        },
        {
            Date: "24/02/2022",
            Value: 65
        },
        {
            Date: "25/02/2022",
            Value: 61
        },
        {
            Date: "26/02/2022",
            Value: 56
        },
        {
            Date: "27/02/2022",
            Value: 58
        },
        {
            Date: "28/02/2022",
            Value: 66
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

    const url = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';

    // const username = 'vienminhphuc';
    // const feedKey = 'gst-fan';
    const aioKey = 'aio_FwnL44zQBHuJwgICmM3ZGIqTHDMg';

    // const url = `https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-fan/data`;


    useEffect(() => {
        fetch(url, {
            headers: {
                'X-AIO-Key': aioKey,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.log(error));
    }, [])

    return (
        <div >
            <AreaChart
                width={650}
                height={250}
                data={data}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                }}
            >

                <defs>
                    <linearGradient id="colorUvHC" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#25b580" stopOpacity={0.8} />
                        <stop offset="90%" stopColor="#2df3aa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPvHC" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#D9D9D9" fill="url(#colorUvHC)" fillOpacity={1} />
            </AreaChart>
        </div >
    )
}

export default HumidChart;