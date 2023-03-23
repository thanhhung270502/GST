import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { useState, useEffect } from 'react';


function CompChart() {
    const pdata = [
        {
            Date: "21/02/2022",
            Value1: 5,
            Value2: 10
        },
        {
            Date: "22/02/2022",
            Value1: 10,
            Value2: 8
        },
        {
            Date: "23/02/2022",
            Value1: 23,
            Value2: 18
        },
        {
            Date: "24/02/2022",
            Value1: 17,
            Value2: 16
        },
        {
            Date: "25/02/2022",
            Value1: 18,
            Value2: 24
        },
        {
            Date: "26/02/2022",
            Value1: 9,
            Value2: 13
        },
        {
            Date: "27/02/2022",
            Value1: 11,
            Value2: 16
        },
        {
            Date: "28/02/2022",
            Value1: 27,
            Value2: 24
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

    // useEffect(() => {
    //     fetch(url, {
    //         headers: {
    //             'X-AIO-Key': AIO_KEY,
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
        <div>
            <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={data} margin={{ right: 50 }}>
                    <CartesianGrid />
                    <XAxis dataKey="Date" stroke='black'
                        interval={'preserveStartEnd'} />
                    <YAxis stroke='black'></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="Value1"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="Value2"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CompChart;