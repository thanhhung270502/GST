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

function toggleFan(valueFan) {
    const username = 'vienminhphuc';
    const feedKey = 'gst-fan';
    const aioKey = 'aio_ZVYY232fdRUHOhzUwnGkVVgNIaO7';

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

    const [temp, setTemp] = useState(22);
    const [tempTimePrev, setTempTimePrev] = useState(22);
    // const [modeTemp, setModeTemp] = useState('Automatic');
    // const [staticTemp, setStaticTemp] = useState('Normal');

    const [light, setLight] = useState(1200);
    const [lightTimePrev, setLightTimePrev] = useState(1200);
    // const [modeLight, setModeLight] = useState('Automatic');
    // const [staticLight, setStaticLight] = useState('Normal');

    const [humi, setHumi] = useState(56);
    const [humiTimePrev, setHumiTimePrev] = useState(56);
    // const [modeHumi, setModeHumi] = useState('Automatic');
    // const [staticHumi, setStaticHumi] = useState('Normal');

    const [soil, setSoil] = useState(56);

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_ZVYY232fdRUHOhzUwnGkVVgNIaO7';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms

    const url_temp = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';
    const url_light = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[1] + '/data';
    const url_soil = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[2] + '/data';
    const url_humi = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';

    // --------------------------------- Start --------------------------------- //

    // useEffect(() => {
    //     fetch(url_temp, {
    //         headers: {
    //             'X-AIO-Key': AIO_KEY,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setTempTimePrev(data[0].created_at);
    //             setTemp(data[0].value);
    //             // if (data[0].value < 21) {
    //             //     setStaticTemp(staticAt[2]);
    //             // } else if (data[0].value >= 21 && data[0].value <= 24) {
    //             //     setStaticTemp(staticAt[1]);
    //             // } else {
    //             //     setStaticTemp(staticAt[0]);
    //             // }
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    // useEffect(() => {
    //     fetch(url_light, {
    //         headers: {
    //             'X-AIO-Key': AIO_KEY,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setLightTimePrev(data[0].created_at);
    //             setLight(data[0].value);
    //             // if (data[0].value < 2000) {
    //             //     setStaticLight(staticAt[2]);
    //             // } else if (data[0].value >= 2000 && data[0].value <= 3000) {
    //             //     setStaticLight(staticAt[1]);
    //             // } else {
    //             //     setStaticLight(staticAt[0]);
    //             // }
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    // useEffect(() => {
    //     fetch(url_humi, {
    //         headers: {
    //             'X-AIO-Key': AIO_KEY,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setHumiTimePrev(data[0].created_at);
    //             setHumi(data[0].value);
    //             // if (data[0].value < 60) {
    //             //     setStaticHumi(staticAt[2]);
    //             // } else if (data[0].value >= 60 && data[0].value <= 70) {
    //             //     setStaticHumi(staticAt[1]);
    //             // } else {
    //             //     setStaticHumi(staticAt[0]);
    //             // }
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

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
                    // if (data[0].value < 21) {
                    //     setStaticTemp(staticAt[2]);
                    // } else if (data[0].value >= 21 && data[0].value <= 24) {
                    //     setStaticTemp(staticAt[1]);
                    // } else {
                    //     setStaticTemp(staticAt[0]);
                    // }
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
                    // if (data[0].value < 2000) {
                    //     setStaticLight(staticAt[2]);
                    // } else if (data[0].value >= 2000 && data[0].value <= 3000) {
                    //     setStaticLight(staticAt[1]);
                    // } else {
                    //     setStaticLight(staticAt[0]);
                    // }
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
                    // if (data[0].value < 60) {
                    //     setStaticHumi(staticAt[2]);
                    // } else if (data[0].value >= 60 && temp <= 70) {
                    //     setStaticHumi(staticAt[1]);
                    // } else {
                    //     setStaticHumi(staticAt[0]);
                    // }
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
                    // if (data[0].value < 60) {
                    //     setStaticHumi(staticAt[2]);
                    // } else if (data[0].value >= 60 && temp <= 70) {
                    //     setStaticHumi(staticAt[1]);
                    // } else {
                    //     setStaticHumi(staticAt[0]);
                    // }
                })
                .catch((error) => console.log(error));
        }, TIMEOUT_MS + 3000);
    }, []);

    const handleFan = () => {
        if (fan === 0) {
            setFan(1);
            toggleFan(fan);
        } else {
            setFan(0);
            toggleFan(fan);
        }
    };
    
    useEffect(() => {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        var show = document.getElementsByClassName('header-section')[0];
        var navbar = $('.navbar');
        navbar.removeClass('fixed');
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();

            if (scroll < 50) {
                navbar.removeClass('sticky');
            } else if (scroll >= 50) {
                navbar.addClass('sticky');
            }
        });
    });


    return (
        <Container fluid className="custom-container">
            {/* <Navbar bg="none" variant="light">
                <Container>
                    <Navbar.Brand className="logo" href="#home">
                        GSTomato
                    </Navbar.Brand>
                    <Nav className="justify-content-center">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#about">About us</Nav.Link>
                        <Nav.Link href="#services">Services</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link href="#connect">Connect</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}
            <Container>
                <Row className="frame5">
                    <Col lg="12" className="text-center">
                        <h2>
                            Seeing all elements of the current climate with <span>GSTomato!</span>
                        </h2>
                    </Col>
                </Row>
            </Container>
            <Container className="CardGroup">
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
                                <Button size="md" variant="warning">
                                    Turn on the light
                                </Button>{' '}
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
                                <Button size="md" variant="success">
                                    Water the tree
                                </Button>{' '}
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
                                <Button size="md" variant="success">
                                    Water the tree
                                </Button>{' '}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Climate;
