import { useEffect } from 'react';
import { getLastScheduleByType, getModeGarden, toggleDeviceDB, updateStatusSchedule } from '~/api/api';
import { getCookie } from '~/api/cookie';
import { toggleDevice } from '~/api/toggle';

function General() {
    const checkTime = (start_time, end_time) => {
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // 7 giờ là múi giờ Việt Nam so với UTC
        var start = new Date(start_time);
        var end = new Date(end_time);

        if (vietnamTime < start) return 'wait';
        else if (start <= vietnamTime && vietnamTime <= end) return 'now';
        else return 'end';
    };

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
