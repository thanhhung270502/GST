import axios from 'axios';
import { useState } from 'react';

const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
const AIO_USERNAME = 'vienminhphuc';
const AIO_KEY = 'aio_tSnc16tAq4ZWzk0HJKJlz9n3W1Ox';
const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
let lastTimestamp = 0;
let timeoutId = null;
let messagePrinted = false;

const url = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';

export const getDataInfo = () => {
    // Set up MQTT client
    // const [data, setData] = useState([]);
    fetch(url, {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // setData(data);
        })
        .catch((error) => console.log(error));
    // return data;
};
