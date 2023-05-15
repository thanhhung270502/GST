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
import soilpng from '../../assets/images/soil.png';
import $ from 'jquery';

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
    const [fan, setFan] = useState(0);

    const [temp, setTemp] = useState(22);

    const [light, setLight] = useState(1200);

    const [humi, setHumi] = useState(56);
    const [soil, setSoil] = useState(56);

    const AIO_KEY = '';
    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
    const url_temp =  "http://localhost:3000/climates/last/temp" ;
    const url_light = "http://localhost:3000/climates/last/light" ;
    const url_soil = "http://localhost:3000/climates/last/soil" ;
    const url_humi =  "http://localhost:3000/climates/last/humi" ;

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
                    setTemp(data.value);            
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
                    setLight(data.value);
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
                    setHumi(data.value);
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
                    setSoil(data.value);
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