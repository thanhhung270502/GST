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
import $ from 'jquery'

function Climate() {
    useEffect(() => {
        var navbar = $('.navbar');
        navbar.addClass('climate__header');
    }, [])

    const [temp, setTemp] = useState([36]);

    const [light, setLight] = useState([1200]);

    const [humi, setHumi] = useState([50]);

    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_frSn91BqMRRjfVRKqU3ql28RIq7c';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const url_temp = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[3] + '/data';
    const url_light = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[1] + '/data';
    const url_humi = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';
    useEffect(() => {
        fetch(url_temp, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
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


        return(
    <Container fluid  className = 'custom-container'>
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
            <Row className = "frame5">
                <Col lg = '12' className = "text-center">
                    <h2>Seeing all elements of the current climate with <span>GSTomato!</span></h2>
                </Col>
            </Row>
        </Container>
        <Container  className = 'CardGroup'>
            <Row className = 'justify-content-between'>
                <Col md={12} lg = {4} xs = {12}  className = "text-center">
                    <div className='customCard'>
                    <div className = 'image'>
                    <img src={hot}  alt="Hot" />;      
                    </div>                 
                    <div className = 'card-content'>
                        <h1>Temperature {temp}°C </h1>
                    </div> 
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-dark">Measure Again</Button>{' '}
                    <div className="space">
                    </div>
                    <Button size = 'md' variant="danger">Turn on the fan</Button>{' '}
                    </div>
                    </div>
                </Col>

                <Col md={12} lg = {4} xs = {12} className = "text-center">
                    <div className='customCard'>
                    <div className = 'image'>
                    <img src={lightpng}  alt="light" />;      
                    </div>                 
                    <div className = 'card-content'>
                        <h1>Lighting {light}Lux </h1>
                    </div>
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-dark">Measure Again</Button>{' '}
                    <div className="space">
                    </div>
                    <Button size = 'md' variant="warning">Turn on the light</Button>{' '}
                    </div>
                    </div>
                </Col>
                <Col md={12} lg = {4} xs = {12} className = "text-center">
                    <div className='customCard'>
                    <div className = 'irri'>
                    <img  src={irri}  alt="irri" />      
                    </div>                 
                    <div className = 'card-content'>
                        <h1>Irrigation {humi}% </h1>
                    </div>
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-dark">Measure Again</Button>{' '}   
                    <div className="space">
                    </div>
                    <Button size = 'md' variant="success">Water the tree</Button>{' '}
                    </div>
                    </div>

                </Col>

                </Row>
            </Container>
      
        </Container>
    )
};

export default Climate;
