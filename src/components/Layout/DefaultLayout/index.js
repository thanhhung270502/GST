import Header from './Header';
import Footer from './Footer';

import React, { useState, useEffect } from 'react';
import { sendData } from '~/api/api';
import { getTheLastData } from '~/api/api';

function DefaultLayout({ children }) {
    //begin fetch data
    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = '';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms

    const url_temp = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';
    const url_light = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[1] + '/data';
    const url_soil = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[2] + '/data';
    const url_humi = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';
    // --------------------------------- Real-time --------------------------------- //
    const send = async (data) => {
        await sendData({type: data.feed_key.slice(4),value: data.value, time: data.created_at});
   };        
   const check = async(data) => {
    const res = await getTheLastData(data.feed_key.slice(4))
    if(res === '') {send(data); throw "Succesfully add to database";}
    res.time = res.time.replace('.000', '')
    if(res.time === data.created_at)
    {
        throw Error("Database already had this row!")
    }
    else send(data);
   };
   useEffect(() => {
    setInterval(async () => {
         fetch(url_temp, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {   
                check(data[0]);
                if(data[0].value > 10)
                {

                }
            })
            .catch((error) => console.log(error));
    }, TIMEOUT_MS);
    setInterval(async () => {
        fetch(url_light, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                check(data[0]);
                if(data[0].value)
                {}

                
            })
            .catch((error) => console.log(error));
    }, TIMEOUT_MS + 1000);

    setInterval(async () => {
        fetch(url_humi, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                check(data[0]);
            })
            .catch((error) => console.log(error));
    }, TIMEOUT_MS + 2000);
    setInterval(async () => {
         
        fetch(url_soil, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                check(data[0]);
            })
            .catch((error) => console.log(error));
    }, TIMEOUT_MS + 3000);
}, []);




    return (
        <div>
            <Header />
            <div className="content">{children}</div>   

            <Footer />
        </div>
    );
}

export default DefaultLayout;
