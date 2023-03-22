import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


function TempChart() {
    const pdata = [
        {
            Date: "21/02/2022",
            Value: 23
        },
        {
            Date: "22/02/2022",
            Value: 22
        },
        {
            Date: "23/02/2022",
            Value: 14
        },
        {
            Date: "24/02/2022",
            Value: 18
        },
        {
            Date: "25/02/2022",
            Value: 20
        },
        {
            Date: "26/02/2022",
            Value: 21
        },
        {
            Date: "27/02/2022",
            Value: 27
        },
        {
            Date: "28/02/2022",
            Value: 22
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Value" stroke="#D9D9D9" fill="#C3FAFF" />
            </AreaChart>
        </div>
    )
}

export default TempChart;