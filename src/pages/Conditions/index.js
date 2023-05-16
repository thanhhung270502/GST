import { useEffect, useState } from 'react';
import './static_page.scss';
import { getCookie } from '~/api/cookie';

function StaticPage() {
    const modeAt = ['Automatic', 'Schedule', 'Manual'];
    const staticAt = ['High', 'Normal', 'Low'];

    const [temp, setTemp] = useState(22);
    const [tempTimePrev, setTempTimePrev] = useState(22);
    const [modeTemp, setModeTemp] = useState('Automatic');
    const [staticTemp, setStaticTemp] = useState('Normal');

    const [light, setLight] = useState(170);
    const [lightTimePrev, setLightTimePrev] = useState(170);
    const [modeLight, setModeLight] = useState('Automatic');
    const [staticLight, setStaticLight] = useState('Normal');

    const [humi, setHumi] = useState(56);
    const [humiTimePrev, setHumiTimePrev] = useState(56);
    const [modeHumi, setModeHumi] = useState('Automatic');
    const [staticHumi, setStaticHumi] = useState('Normal');

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = getCookie("garden_key");
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
    let lastTimestamp = 0;
    let timeoutId = null;
    let messagePrinted = false;

    const url_temp = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';
    const url_light = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[1] + '/data';
    const url_soil = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[2] + '/data';
    const url_humi = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';

    // --------------------------------- Start --------------------------------- //

    useEffect(() => {
        fetch(url_temp, {
            headers: {  
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTempTimePrev(data[0].created_at);
                setTemp(data[0].value);
                if (data[0].value < 21) {
                    setStaticTemp(staticAt[2]);
                } else if (data[0].value >= 21 && data[0].value <= 24) {
                    setStaticTemp(staticAt[1]);
                } else {
                    setStaticTemp(staticAt[0]);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(url_light, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLightTimePrev(data[0].created_at);
                setLight(data[0].value);
                if (data[0].value < 2000) {
                    setStaticLight(staticAt[2]);
                } else if (data[0].value >= 2000 && data[0].value <= 3000) {
                    setStaticLight(staticAt[1]);
                } else {
                    setStaticLight(staticAt[0]);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(url_humi, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHumiTimePrev(data[0].created_at);
                setHumi(data[0].value);
                if (data[0].value < 60) {
                    setStaticHumi(staticAt[2]);
                } else if (data[0].value >= 60 && data[0].value <= 70) {
                    setStaticHumi(staticAt[1]);
                } else {
                    setStaticHumi(staticAt[0]);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    // --------------------------------- Real-time --------------------------------- //
    useEffect(() => {
        setInterval(() => {
            fetch(url_temp, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTemp(data[0].value);
                    console.log(data[0]);
                    if (data[0].created_at === tempTimePrev) {
                        // alert('Chương trình bị dừng');
                    }
                    if (data[0].value < 21) {
                        setStaticTemp(staticAt[2]);
                    } else if (data[0].value >= 21 && data[0].value <= 24) {
                        setStaticTemp(staticAt[1]);
                    } else {
                        setStaticTemp(staticAt[0]);
                    }
                })
                .catch((error) => console.log(error));
        }, 5000);
        setInterval(() => {
            fetch(url_light, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setLight(data[0].value);
                    if (data[0].value < 2000) {
                        setStaticLight(staticAt[2]);
                    } else if (data[0].value >= 2000 && data[0].value <= 3000) {
                        setStaticLight(staticAt[1]);
                    } else {
                        setStaticLight(staticAt[0]);
                    }
                })
                .catch((error) => console.log(error));
        }, 5000);
        setInterval(() => {
            fetch(url_humi, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setHumi(data[0].value);
                    if (data[0].value < 60) {
                        setStaticHumi(staticAt[2]);
                    } else if (data[0].value >= 60 && temp <= 70) {
                        setStaticHumi(staticAt[1]);
                    } else {
                        setStaticHumi(staticAt[0]);
                    }
                })
                .catch((error) => console.log(error));
        }, 5000);
    }, []);

    return (
        <div className="static-page">
            <div className="condition d-flex mb-4">
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info">
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                            <i class="uil uil-sun"></i>
                        </div>
                        <div className="value">
                            {temp}
                            <i class="uil uil-celsius"></i>
                        </div>
                        <div className="static">{staticTemp}</div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>TEMPERATOR</h2>
                            </div>
                            <div className="attribute">
                                Mode :<span> {modeTemp} </span>
                            </div>
                            <div className="attribute">
                                Static :<span> {staticTemp}</span>
                                {staticTemp !== 'Normal' && <span>(Need to keep from 21 to 24)</span>}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="condition d-flex mb-4" style={{ backgroundColor: 'var(--black-blue)' }}>
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info" style={{ backgroundColor: 'var(--blue)' }}>
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                            <i class="uil uil-brightness-half"></i>
                        </div>
                        <div className="value">
                            {light}
                            <span> LUX</span>
                        </div>
                        <div className="static">{}</div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>LIGHTING</h2>
                            </div>
                            <div className="attribute">
                                Mode :<span> {modeLight} </span>
                            </div>
                            <div className="attribute">
                                Static :<span> {staticLight} </span>
                                {staticLight !== 'Normal' && <span>(Need to keep from 21 to 24)</span>}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="condition d-flex mb-4" style={{ backgroundColor: 'var(--black-green)' }}>
                <div className="col-5">
                    <div className="d-flex flex-column p-4 left-info" style={{ backgroundColor: 'var(--green-dark)' }}>
                        <div className="title">
                            <div className="day">Sunday</div>
                            <div>
                                12, March, 2023 <br></br>
                                Tomato Garden
                            </div>
                        </div>
                        <div className="icon">
                            <i class="uil uil-tear"></i>
                        </div>
                        <div className="value">{humi}%</div>
                        <div className="static">{staticHumi}</div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex flex-column right-info">
                        <div className="title">
                            <div className="text-center">
                                <h2>IRRIGATION</h2>
                            </div>
                            <div className="attribute">
                                Mode :<span> {modeHumi} </span>
                            </div>
                            <div className="attribute">
                                Static :<span> {staticHumi} </span>
                                {staticHumi !== 'Normal' && <span>(Need to keep from 21 to 24)</span>}
                            </div>
                        </div>
                        <div className="btn-area text-center">
                            <div className="btn-change mb-3">
                                <span>MEASURE</span>
                            </div>
                            <div className="btn-change">
                                <span>SETTING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticPage;
