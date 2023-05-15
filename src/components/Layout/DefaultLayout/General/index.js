import { getLastScheduleByType, getModeGarden, toggleDeviceDB, updateStatusSchedule } from '~/api/api';
import { getCookie } from '~/api/cookie';
import { toggleDevice } from '~/api/toggle';
import React, { useState, useEffect } from 'react';
import { sendData } from '~/api/api';
import { getLastClimateByType } from '~/api/api';
import { getTheLastData } from '~/api/api';
import { sendNoti } from '~/api/api';
const LOW_TEMP = 20; 
// NHỎ HƠN LOW TEMP: TAT QUAT & BAT LED
const HIGH_TEMP = 30;
//LỚN HƠN HIGH: BAT QUAT & TAT LED

const LOW_LIGHT = 1000;
// NHO HON LOW: BAT LED

const HIGH_LIGHT = 3000; //LON HON HIGH: TAT LED & DONG MAI

const LOW_HUMI = 80;   // NHO HON LOW: BAT PUMP
const HIGH_HUMI = 95; //LON HON: TAT PUMP & BAT QUAT

const LOW_SOIL = 70; //NHO HON LƠW: BAT PUMP
const HIGH_SOIL = 85; // LON HON : TAT PUMP
const garden_id = getCookie('garden_id');

const checkTemp = async(data) =>
{
    const problem = ['The temperature is too high', 'The temperature is normal', 'The temperature is too low'];

    if( data.value < LOW_TEMP)
    {

        await sendNoti({status: 'warn',problem: problem[2], sub_problem: "Turn off fan & Turn on the light", time: data.time, garden_id: garden_id}); 
        await toggleDeviceDB('fan', 0);
        await getFan();
        await toggleDeviceDB('led', 1);
    }
    else if(data.value > HIGH_TEMP)
    {
        await sendNoti({status: 'danger',problem: problem[2], sub_problem: "Turn on fan and turn off the light",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('fan', 1);
        await toggleDeviceDB('led', 0);
    }
    else 
    {
        await sendNoti({status: 'info',problem: problem[1], sub_problem: "Do nothing", time: data.time, garden_id: garden_id}); 
        return;
    }

}
const checkLight = async(data) =>
{
    const problem = ['The lighting strength is too high', 'The lighting strength is normal', 'The lighting strength is too low'];

    if( data.value < LOW_LIGHT)
    {
        await sendNoti({status: 'warning',problem: problem[2], sub_problem: "Turn on the light",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('led', 1);
    }
    else if(data.value > HIGH_LIGHT)
    {
        await sendNoti({status: 'danger',problem: problem[0], sub_problem: "Turn off the light and close the roof",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('roof', 0);
        await toggleDeviceDB('led', 0);
    }
    else 
    {
        await sendNoti({status: 'info',problem: problem[1], sub_problem: "Do nothing",time: data.time, garden_id: garden_id}); 
        return;
    }
}
const checkHumi = async(data) =>
{
    const problem = ['The humid value is too high', 'The humid value is normal', 'The humid value is too low'];

    if( data.value < LOW_HUMI)
    {
        await sendNoti({status: 'warning',problem: problem[2], sub_problem: "Turn on the pump",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('pump', 1);
    }
    else if(data.value > HIGH_HUMI)
    {
        await sendNoti({status: 'danger',problem: problem[0], sub_problem: "Turn on the fan & turn off the pump",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('pump', 0);
        await toggleDeviceDB('fan', 1);

    }
    else 
    {
        await sendNoti({status: 'info',problem: problem[1], sub_problem: "Do nothing",time: data.time, garden_id: garden_id}); 

        return;
    }
}
const checkSoil = async(data) =>
{
    const problem = ['The soil value is too high', 'The soil value is normal', 'The soil value is too low'];

    if( data.value < LOW_SOIL)
    {
        await sendNoti({status: 'warning',problem: problem[2], sub_problem: "Turn on the pump",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('pump', 1);
    }
    else if(data.value > HIGH_SOIL)
    {
        await sendNoti({status: 'danger',problem: problem[0], sub_problem: "Turn off the pump",time: data.time, garden_id: garden_id}); 

        await toggleDeviceDB('pump', 0);
    }
    else 
    {
        await sendNoti({status: 'info',problem: problem[1], sub_problem: "Do nothing",time: data.time, garden_id: garden_id}); 

        return;
    }
}
function getFan() {
    const apiKey = '';

    return fetch('https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-fan/data', {
      headers: {
        'X-AIO-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("bubububu");
        console.log(data[0]);
        return data[0];
      })
      .catch(error => {
        console.error('Error while getting fan:', error);
        return null;
      });
  }
  getFan();
  





function General() {
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
})
    const checkTime = (start_time, end_time) => {
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // 7 giờ là múi giờ Việt Nam so với UTC
        var start = new Date(start_time);
        var end = new Date(end_time);

        if (vietnamTime < start) return 'wait';
        else if (start <= vietnamTime && vietnamTime <= end) return 'now';
        else return 'end';
    };

//setting mode
    useEffect(() => {
        const garden_id = getCookie('garden_id');
        if (garden_id) {
            const timerTemp = setInterval(async () => {
                const getTempMode = await getModeGarden(garden_id, 'temp');
                if (getTempMode && getTempMode.mode == 'schedule') {
                    const getTempSchedule = await getLastScheduleByType(garden_id, 'temp');
                    if (getTempSchedule) {
                        const checkTimeSchedule = checkTime(getTempSchedule.start_time, getTempSchedule.end_time);
                        if (checkTimeSchedule == 'now' && getTempSchedule.status == 'wait') {
                            const res = await toggleDeviceDB('fan', 1);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'temp',
                                status: 'now',
                            });
                            console.log(res2);
                            console.log('OK!');
                        } else if (checkTimeSchedule == 'end' && getTempSchedule.status == 'now') {
                            const res = await toggleDeviceDB('fan', 0);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'temp',
                                status: 'end',
                            });
                            console.log(res2);
                            console.log('OK!');
                        }
                    }
                }
                else if (getTempMode && getTempMode.mode == 'auto') {
                    // Bu here....
                    const getTemp = async() => {
                        const res = await getLastClimateByType("temp");
                        console.log(res)
                        checkTemp(res);
                    }
                    getTemp();
                }
            }, 10000);
            const timerLight = setInterval(async () => {
                const getLightMode = await getModeGarden(garden_id, 'light');
                if (getLightMode && getLightMode.mode == 'schedule') {
                    const getLightSchedule = await getLastScheduleByType(garden_id, 'light');
                    if (getLightSchedule) {
                        const checkTimeSchedule = checkTime(getLightSchedule.start_time, getLightSchedule.end_time);
                        if (checkTimeSchedule == 'now' && getLightSchedule.status == 'wait') {
                            const res = await toggleDeviceDB('led', 1);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'light',
                                status: 'now',
                            });
                        } else if (checkTimeSchedule == 'end' && getLightSchedule.status == 'now') {
                            const res = await toggleDeviceDB('led', 0);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'light',
                                status: 'end',
                            });
                            console.log(res2);
                            console.log('OK!');
                        }
                    }
                }
                else if (getLightMode && getLightMode.mode == 'auto') {
                    // Bu here....
                    const getLight = async() => {
                        const res = await getLastClimateByType("light");
                        console.log(res);
                        checkLight(res);
                    }
                    getLight();
                }
            }, 10000);
            const timerHumi = setInterval(async () => {
                const getHumiMode = await getModeGarden(garden_id, 'humi');
                if (getHumiMode && getHumiMode.mode == 'schedule') {
                    const getHumiSchedule = await getLastScheduleByType(garden_id, 'humi');
                    if (getHumiSchedule) {
                        const checkTimeSchedule = checkTime(getHumiSchedule.start_time, getHumiSchedule.end_time);
                        if (checkTimeSchedule == 'now' && getHumiSchedule.status == 'wait') {
                            const res = await toggleDeviceDB('pump', 1);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'humi',
                                status: 'now',
                            });
                        } else if (checkTimeSchedule == 'end' && getHumiSchedule.status == 'now') {
                            const res = await toggleDeviceDB('pump', 0);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'humi',
                                status: 'end',
                            });
                            console.log(res2);
                            console.log('OK!');
                        }
                    }
                }
                else if (getHumiMode && getHumiMode.mode == 'auto') {
                    // Bu here....
                    const getHumi = async() => {
                        const res = await getLastClimateByType("light");
                        console.log(res)
                        checkHumi(res);
                    }
                    getHumi();

                }
            }, 10000);
            const timerSoil = setInterval(async () => {
                const getSoilMode = await getModeGarden(garden_id, 'soil');
                if (getSoilMode && getSoilMode.mode == 'schedule') {
                    const getSoilSchedule = await getLastScheduleByType(garden_id, 'soil');
                    if (getSoilSchedule) {
                        const checkTimeSchedule = checkTime(getSoilSchedule.start_time, getSoilSchedule.end_time);
                        if (checkTimeSchedule == 'now' && getSoilSchedule.status == 'wait') {
                            const res = await toggleDeviceDB('roof', 1);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'soil',
                                status: 'now',
                            });
                        } else if (checkTimeSchedule == 'end' && getSoilSchedule.status == 'now') {
                            const res = await toggleDeviceDB('roof', 0);
                            const res2 = await updateStatusSchedule({
                                garden_id,
                                type: 'soil',
                                status: 'end',
                            });
                            console.log(res2);
                            console.log('OK!');
                        }
                    }
                }
                else if (getSoilMode && getSoilMode.mode == 'auto') {
                    // Bu here....
                    const getSoil = async() => {
                        const res = await getLastClimateByType("soi");
                        console.log(res);
                        checkSoil(res);
                    }
                    getSoil();


                }
            }, 10000);
            return () => {
                clearInterval(timerTemp);
                clearInterval(timerLight);
                clearInterval(timerHumi);
                clearInterval(timerSoil);
            };
        }
    }, []);

    return <></>;
}

export default General;
