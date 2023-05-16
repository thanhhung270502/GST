import './climate.scss';
import '@fontsource/poppins'; // Defaults to weight 400.
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import hot from '../../assets/images/hot.png';
import lightpng from '../../assets/images/light.png';
import irri from '../../assets/images/irrigation.png';
import soilpng from '../../assets/images/soil.png'
import $ from 'jquery';
import { sendData, toggleDeviceDB } from '~/api/api';
import { getTheLastData } from '~/api/api';
import { toggleDevice } from '~/api/toggle';
import { getCookie } from '~/api/cookie';

function toggleFan(valueFan) {
    const username = 'vienminhphuc';
    const feedKey = 'gst-fan';
    const aioKey = '';
    const url = `https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-fan/data`;

    //Create a GET request with value 1 and send it to AdafruitIO
    fetch(url, {
        method: 'POST',
        headers: {
            'X-AIO-Key': aioKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: 0, //Turn on the fan
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}

function Climate() {
    const staticAt = ['High', 'Normal', 'Low'];

    const [fan, setFan] = useState(0);
    const [led, setLed] = useState(0);
    const [pump, setPump] = useState(0);
    const [roof, setRoof] = useState(0);

    const [temp, setTemp] = useState(22);
    const [light, setLight] = useState(1200);
    const [humi, setHumi] = useState(56);
    const [soil, setSoil] = useState(56);
    
    const [type, setType] = useState();

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = getCookie("garden_key");
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms

    const url_temp = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';
    const url_light = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[1] + '/data';
    const url_soil = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[2] + '/data';
    const url_humi = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';
    // --------------------------------- Real-time --------------------------------- //
    const send = async (data) => {
        await sendData({ type: data.feed_key.slice(4), value: data.value, time: data.created_at, garden_id: getCookie("garden_id") });
    };
    const check = async (data) => {
        const res = await getTheLastData(data.feed_key.slice(4))
        if (res === '') { send(data); throw "Succesfully add to database"; }
        res.time = res.time.replace('.000', '')
        if (res.time === data.created_at) {
            throw Error("Database already had this row!")
        }
        else send(data);
    };

    useEffect(() => {
        const getA = setInterval(async () => {
            fetch(url_temp, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },

            })
                .then((response) => response.json())
                .then((data) => {
                    check(data[0]);
                    setTemp(data[0].value);
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS);
        const getB = setInterval(async () => {
            fetch(url_light, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    check(data[0]);
                    setLight(data[0].value);
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 1000);

        const getC = setInterval(async () => {
            fetch(url_humi, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    check(data[0]);
                    setHumi(data[0].value);
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 2000);
        
        const getD = setInterval(async () => {
            fetch(url_soil, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    check(data[0]);
                    setSoil(data[0].value);
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 3000);

        return () => {
            clearInterval(getA);
            clearInterval(getB);
            clearInterval(getC);
            clearInterval(getD);
        }
    }, []);

    const handleFan = () => {
        if (fan === 0) {
            setFan(1);
            toggleDevice("fan", 1);
            toggleDeviceDB("fan", 1);
        } else {
            setFan(0);
            toggleDevice("fan", 0);
            toggleDeviceDB("fan", 0);
        }
    };

    const handleLed = () => {
        if (led === 0) {
            setLed(1);
            toggleDevice("led", 1);
            toggleDeviceDB("led", 1);
        } else {
            setLed(0);
            toggleDevice("led", 0);
            toggleDeviceDB("led", 0);
        }
    };

    const handlePump = () => {
        if (pump === 0) {
            setPump(1);
            toggleDevice("pump", 1);
            toggleDeviceDB("pump", 1);
        } else {
            setPump(0);
            toggleDevice("pump", 0);
            toggleDeviceDB("pump", 0);
        }
    };

    const handleRoof = () => {
        if (roof === 0) {
            setRoof(1);
            toggleDevice("roof", 1);
            toggleDeviceDB("roof", 1);
        } else {
            setRoof(0);
            toggleDevice("roof", 0);
            toggleDeviceDB("roof", 0);
        }
    };


    return (
        <Container fluid className="custom-container">
            <Container>
                <Row className="frame5">
                    <Col lg="12" className="text-center">
                        <h2>
                            Seeing all elements of the current climate with <span>GSTomato!</span>
                        </h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="CardGroup">
                <Row className="justify-content-between">
                    <Col md={12} lg={3} xs={12} className="text-center">
                        <div className="customCard">
                            <div className="image">
                                <img src={hot} alt="Hot" />;
                            </div>
                            <div className="card-content">
                                <h2>Temperature</h2>
                                <h1 className="card-value">{temp}°C</h1>
                            </div>
                            <div className="button-group">
                                <Button size="md" variant="outline-dark">
                                    Measure Again
                                </Button>{' '}
                                <div className="space"></div>
                                {fan === 0 && (
                                    <div className="btn btn-danger btn-md" onClick={handleFan}>
                                        Turn on the fan
                                    </div>
                                )}
                                {fan === 1 && (
                                    <div className="btn btn-danger btn-md" onClick={handleFan}>
                                        Turn off the fan
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col md={12} lg={3} xs={12} className="text-center">
                        <div className="customCard">
                            <div className="image">
                                <img src={lightpng} alt="light" />;
                            </div>
                            <div className="card-content">
                                <h2>Lighting</h2>
                                <h1 className="card-value">{light} Lux</h1>
                            </div>
                            <br></br>
                            <div className="button-group">
                                <Button size="md" variant="outline-dark">
                                    Measure Again
                                </Button>{' '}
                                <div className="space"></div>
                                {led === 0 && (
                                    <div className="btn btn-danger btn-md" onClick={handleLed}>
                                        Turn on the led
                                    </div>
                                )}
                                {led === 1 && (
                                    <div className="btn btn-danger btn-md" onClick={handleLed}>
                                        Turn off the led
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={3} xs={12} className="text-center">
                        <div className="customCard">
                            <div className="irri">
                                <img src={irri} alt="irri" />
                            </div>
                            <div className="card-content">
                                <h2>Humidity</h2>
                                <h1 className="card-value">{humi}%</h1>
                            </div>
                            <br></br>
                            <div className="button-group">
                                <Button size="md" variant="outline-dark">
                                    Measure Again
                                </Button>{' '}
                                <div className="space"></div>
                                {pump === 0 && (
                                    <div className="btn btn-danger btn-md" onClick={handlePump}>
                                        Turn on the pump
                                    </div>
                                )}
                                {pump === 1 && (
                                    <div className="btn btn-danger btn-md" onClick={handlePump}>
                                        Turn off the pump
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={3} xs={12} className="text-center">
                        <div className="customCard">
                            <div className="soilpng">
                                <img src={soilpng} alt="soil" />
                            </div>
                            <div className="card-content">
                                <h2>Soil Moisture</h2>
                                <h1 className="card-value">{soil}%</h1>
                            </div>
                            <br></br>
                            <div className="button-group">
                                <Button size="md" variant="outline-dark">
                                    Measure Again
                                </Button>{' '}
                                <div className="space"></div>
                                {roof === 0 && (
                                    <div className="btn btn-danger btn-md" onClick={handleRoof}>
                                        Turn on the roof
                                    </div>
                                )}
                                {roof === 1 && (
                                    <div className="btn btn-danger btn-md" onClick={handleRoof}>
                                        Turn off the roof
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Climate;