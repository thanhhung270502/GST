import { useEffect } from 'react';
import { useState } from 'react';
import {
    createModeGarden,
    createSchedule,
    getLastClimateByType,
    getLastScheduleByType,
    getModeGarden,
    getStatusByName,
    toggleDeviceDB,
    updateModeGarden,
} from '~/api/api';
import TimeOut from './timeout';
import { getCookie } from '~/api/cookie';
import { getDeviceValue, toggleDevice } from '~/api/toggle';

function Mode(props) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [scheduleMode, setScheduleMode] = useState('');

    const [fan, setFan] = useState(0);
    const [led, setLed] = useState(0);
    const [pump, setPump] = useState(0);
    const [roof, setRoof] = useState(0);

    const convertTime = (datetime) => {
        if (datetime) {
            let start_time = '';
            start_time =
                datetime.start_time.substr(11, 8) +
                ' ' +
                datetime.start_time.substr(8, 2) +
                '-' +
                datetime.start_time.substr(5, 2) +
                '-' +
                datetime.start_time.substr(0, 4);
            setStartTime(start_time);

            let end_time = '';
            end_time =
                datetime.end_time.substr(11, 8) +
                ' ' +
                datetime.end_time.substr(8, 2) +
                '-' +
                datetime.end_time.substr(5, 2) +
                '-' +
                datetime.end_time.substr(0, 4);
            setEndTime(end_time);
            // checkTime(datetime.start_time, datetime.end_time);
        } else {
            setScheduleMode('end');
        }
    };

    const checkTime = (start_time, end_time) => {
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // 7 giờ là múi giờ Việt Nam so với UTC
        var start = new Date(start_time);
        var end = new Date(end_time);

        if (vietnamTime < start) setScheduleMode('wait');
        else if (start <= vietnamTime && vietnamTime <= end) setScheduleMode('now');
        else setScheduleMode('end');
    };

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ['type']: props.type,
        }));
        (async () => {
            await getLastScheduleByType(getCookie('garden_id'), props.type).then((data) => {
                convertTime(data);
                checkTime(data.start_time, data.end_time);
                console.log(data);
            });
        })();
    }, [props.type]);

    useEffect(() => {
        (async () => {
            await getLastScheduleByType(getCookie('garden_id'), props.type).then((data) => {
                convertTime(data);
                checkTime(data.start_time, data.end_time);
                console.log(data);
            });
        })();
    }, [scheduleMode]);

    useEffect(() => {
        const garden_id = getCookie('garden_id');
        const timer = setInterval(async () => {
            const getSchedule = await getLastScheduleByType(garden_id, props.type);

            if (getSchedule && getSchedule.status != scheduleMode) {
                setScheduleMode(getSchedule.status);
                console.log('yess');
            }
            const getDeviceStatus = await getStatusByName(getDevice());

            if (getDeviceStatus && getDeviceStatus.name == 'fan' && getDeviceStatus.status != fan) {
                setFan(getDeviceStatus.status);
            } else if (getDeviceStatus && getDeviceStatus.name == 'led' && getDeviceStatus.status != led) {
                setLed(getDeviceStatus.status);
            } else if (getDeviceStatus && getDeviceStatus.name == 'pump' && getDeviceStatus.status != pump) {
                setPump(getDeviceStatus.status);
            } else if (getDeviceStatus && getDeviceStatus.name == 'roof' && getDeviceStatus.status != roof) {
                setRoof(getDeviceStatus.status);
            }
        }, 10000);
        return () => clearInterval(timer);
    }, [props.type, fan, led, roof, pump]);

    const [data, setData] = useState({
        type: props.type,
        garden_id: getCookie('garden_id'),
        start_time: null,
        end_time: null,
        status: 'wait',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateModeGarden = async (mode) => {
        console.log(mode);
        const user_id = getCookie('user_id');
        const res = await updateModeGarden({ user_id, mode });
    };

    const getDevice = () => {
        if (props.type == 'temp') return 'fan';
        else if (props.type == 'light') return 'led';
        else if (props.type == 'humi') return 'pump';
        else if (props.type == 'soil') return 'roof';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const res = await createSchedule(data);
        checkTime(data.start_time, data.end_time);

        const mode = 'schedule';
        const garden_id = getCookie('garden_id');
        const checkModeGarden = await getModeGarden(garden_id, props.type);
        if (!checkModeGarden) {
            console.log('Here1');
            const create_mode_garden = await createModeGarden({
                garden_id,
                type: props.type,
                mode,
            });
        } else {
            console.log('Here2');
            const res2 = await updateModeGarden({
                garden_id: getCookie('garden_id'),
                type: props.type,
                mode,
            });
        }
    };

    const handleAutoSubmit = async (e) => {
        e.preventDefault();
        const mode = 'auto';
        const garden_id = getCookie('garden_id');
        const checkModeGarden = await getModeGarden(garden_id, props.type);
        if (!checkModeGarden) {
            console.log('Here1');
            const create_mode_garden = await createModeGarden({
                garden_id,
                type: props.type,
                mode,
            });
        } else {
            console.log('Here2');
            const res2 = await updateModeGarden({
                garden_id: getCookie('garden_id'),
                type: props.type,
                mode,
            });
        }
    };

    const handleToggleDevice = async (e) => {
        e.preventDefault();
        if (props.type == 'temp') {
            let value = fan === 1 ? 0 : 1;
            const res = await toggleDeviceDB('fan', value);
            toggleDevice('fan', value);
            setFan(value);
        } else if (props.type == 'light') {
            let value = led === 1 ? 0 : 1;
            const res = await toggleDeviceDB('led', value);
            toggleDevice('led', value);
            setLed(value);
        } else if (props.type == 'humi') {
            let value = pump === 1 ? 0 : 1;
            const res = await toggleDeviceDB('pump', value);
            toggleDevice('pump', value);
            setPump(value);
        } else if (props.type == 'soil') {
            let value = roof === 1 ? 0 : 1;
            const res = await toggleDeviceDB('roof', value);
            toggleDevice('roof', value);
            setRoof(value);
        }
    };

    const buttonDevice = (type) => {
        if (type == 'temp') {
            return (
                <div className="">
                    {fan === 0 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn on the fan
                            </button>
                        </form>
                    )}
                    {fan === 1 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn off the fan
                            </button>
                        </form>
                    )}
                </div>
            );
        } else if (type == 'light') {
            return (
                <div className="">
                    {led === 0 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn on the led
                            </button>
                        </form>
                    )}
                    {led === 1 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn off the led
                            </button>
                        </form>
                    )}
                </div>
            );
        } else if (type == 'humi') {
            return (
                <div className="">
                    {pump === 0 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn on the pump
                            </button>
                        </form>
                    )}
                    {pump === 1 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn off the pump
                            </button>
                        </form>
                    )}
                </div>
            );
        } else if (type == 'soil') {
            return (
                <div className="">
                    {roof === 0 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn on the roof
                            </button>
                        </form>
                    )}
                    {roof === 1 && (
                        <form onSubmit={handleToggleDevice}>
                            <button type="submit" className="mode-btn">
                                Turn off the roof
                            </button>
                        </form>
                    )}
                </div>
            );
        }
    };

    const handleGetData = async (device) => {
        if (props.type == "temp") {
            const response = await getDeviceValue("fan");
            console.log("abc: ", response);
            if (response.value != fan) {
                setFan(response.value);
            }
        } 
        else if (props.type == "light") {
            const response = await getDeviceValue("led");
            console.log("abc: ", response);
            if (response.value != led) {
                setLed(response.value);
            }
        }
        else if (props.type == "humi") {
            const response = await getDeviceValue("pump");
            console.log("abc: ", response);
            if (response.value != pump) {
                setPump(response.value);
            }
        }
        else if (props.type == "soil") {
            const response = await getDeviceValue("roof");
            console.log("abc: ", response);
            if (response.value != roof) {
                setRoof(response.value);
            }
        }
    };  

    useEffect(() => {
        (async () => {
            let currentDevice = '';
            if (props.type == 'temp') {
                currentDevice = 'fan';
            } else if (props.type == 'light') {
                currentDevice = 'led';
            } else if (props.type == 'humi') {
                currentDevice = 'pump';
            } else if (props.type == 'soil') {
                currentDevice = 'roof';
            }

            console.log(currentDevice);

            await getStatusByName(currentDevice).then((data) => {
                if (currentDevice == 'fan') {
                    setFan(data.status);
                } else if (currentDevice == 'led') {
                    setLed(data.status);
                } else if (currentDevice == 'pump') {
                    setPump(data.status);
                } else if (currentDevice == 'roof') {
                    setRoof(data.status);
                }
                console.log(data);
            });
        })();
    }, [fan, led, pump, roof, props.type]);

    return (
        <div className="mode-section">
            {props.mode == 'schedule' && (
                <div className="mode-schedule-section">
                    {scheduleMode == 'end' && (
                        <form onSubmit={handleSubmit}>
                            <div className="mode-title">Scheduled for {getDevice()}</div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    Time to start:
                                </label>
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    name="start_time"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    Time to end:
                                </label>
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    name="end_time"
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="mode-btn">
                                Apply
                            </button>
                        </form>
                    )}
                    {scheduleMode == 'wait' && (
                        <div>
                            <div className="title">
                                You planned to open the fan at {startTime} and close the fan at {endTime}
                            </div>
                            <form>
                                <button></button>
                            </form>
                        </div>
                    )}
                    {scheduleMode == 'now' && (
                        <div>
                            <div className="title">
                                The schedule is processing and it will stop at {endTime} <br />
                            </div>
                            {buttonDevice(props.type)}
                        </div>
                    )}
                </div>
            )}
            {props.mode == 'auto' && (
                <div className="mode-auto-section">
                    <form onSubmit={handleAutoSubmit}>
                        <button type="submit" className="mode-btn">
                            Start
                        </button>
                    </form>
                </div>
            )}
            {props.mode == 'manual' && (
                <div>
                    <div className='mode-btn mb-3' onClick={handleGetData}>Get data {getDevice(props.type)}</div>
                    {buttonDevice(props.type)}
                    {/* <form onSubmit={    (getDevice(props.type))}>
                        <button className="mode-btn" type="submit">
                            Get data {getDevice(props.type)}
                        </button>
                    </form> */}
                </div>
            )}
        </div>
    );
}

export default Mode;
