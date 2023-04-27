import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


function RaChart() {
    const pdata = [
        {
            "subject": "Math",
            "A": 120,
            "B": 110,
            "fullMark": 150
        },
        {
            "subject": "Chinese",
            "A": 98,
            "B": 130,
            "fullMark": 150
        },
        {
            "subject": "English",
            "A": 86,
            "B": 130,
            "fullMark": 150
        },
        {
            "subject": "Geography",
            "A": 99,
            "B": 100,
            "fullMark": 150
        },
        {
            "subject": "Physics",
            "A": 85,
            "B": 90,
            "fullMark": 150
        },
        {
            "subject": "History",
            "A": 65,
            "B": 85,
            "fullMark": 150
        }
    ];

    const [data, setData] = useState(pdata);
    console.log(data);

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_ZVYY232fdRUHOhzUwnGkVVgNIaO7';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
    let lastTimestamp = 0;
    let timeoutId = null;
    let messagePrinted = false;

    const url = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';

    // const url = `https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-fan/data`;


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
        <div >
            <ResponsiveContainer width='100%' aspect={0.8} >
                <RadarChart outerRadius={100} data={pdata}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div >
    )
}

export default RaChart;