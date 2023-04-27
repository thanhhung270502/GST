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
import $ from 'jquery';
import { toggleDevice } from '~/api/toggle';




function Climate() {
    const staticAt = ['High', 'Normal', 'Low'];
    const [fan, setFan] = useState(0);
    const [led, setLed] = useState(0);
    const [pump, setPump] = useState(0);
    const [roof, setRoof] = useState(0);

    const [temp, setTemp] = useState(22);
    const [tempTimePrev, setTempTimePrev] = useState(22);

    const [light, setLight] = useState(1200);
    const [lightTimePrev, setLightTimePrev] = useState(1200);

    const [humi, setHumi] = useState(56);
    const [humiTimePrev, setHumiTimePrev] = useState(56);

    const [soil, setSoil] = useState(56);

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_vzdq51hH08Y7zHyKkTTXSx8ubgIp';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms

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
                setTemp(data[0].value);
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
                setLight(data[0].value);
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
                setHumi(data[0].value);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(url_soil, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSoil(data[0].value);
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
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS);
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
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 1000);
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
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 2000);
        setInterval(() => {
            fetch(url_soil, {
                headers: {
                    'X-AIO-Key': AIO_KEY,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSoil(data[0].value);
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 3000);
    }, []);

    const handleFan = () => {
        if (fan === 0) {
            setFan(1);
            toggleDevice("fan", 1);
        } else {
            setFan(0);
            toggleDevice("fan", 0);
        }
    };

    const handleLed = () => {
        if (led === 0) {
            setLed(1);
            toggleDevice("led", 1);
        } else {
            setLed(0);
            toggleDevice("led", 0);
        }
    };

    const handlePump = () => {
        if (led === 0) {
            setPump(1);
            toggleDevice("pump", 1);
        } else {
            setPump(0);
            toggleDevice("pump", 0);
        }
    };

    const handleRoof = () => {
        if (led === 0) {
            setRoof(1);
            toggleDevice("roof", 1);
        } else {
            setRoof(0);
            toggleDevice("roof", 0);
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
                                    <div className="btn btn-warning btn-md" onClick={handleLed}>
                                        Turn on the light
                                    </div>
                                )}
                                {led === 1 && (
                                    <div className="btn btn-warning btn-md" onClick={handleLed}>
                                        Turn off the light
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
                                    <div className="btn btn-success btn-md" onClick={handlePump}>
                                        Turn on the pump
                                    </div>
                                )}
                                {pump === 1 && (
                                    <div className="btn btn-success btn-md" onClick={handlePump}>
                                        Turn off the pump
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
                                    <div className="btn btn-success btn-md" onClick={handleRoof}>
                                        Turn on the roof
                                    </div>
                                )}
                                {roof === 1 && (
                                    <div className="btn btn-success btn-md" onClick={handleRoof}>
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
