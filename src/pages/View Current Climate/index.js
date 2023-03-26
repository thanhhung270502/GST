import './climate.scss'
import "@fontsource/poppins"; // Defaults to weight 400.
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import hot from '../../assets/images/hot.png'; 
import light from '../../assets/images/light.png'
import irri from '../../assets/images/irrigation.png'
function Climate() {
        return(
    <Container fluid  className = 'custom-container'>
      <Navbar bg="none" variant="light">
        <Container>
          <Navbar.Brand className = "logo" href="#home" >GSTomato</Navbar.Brand>
          <Nav className="justify-content-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#about">About us</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link href="#connect">Connect</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
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
                        <h1>Temperature 35°C </h1>
                    </div> 
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-light">Measure Again</Button>{' '}
                    <div className="space">
                    </div>
                    <Button size = 'md' variant="danger">Turn on the fan</Button>{' '}
                    </div>
                    </div>
                </Col>

                <Col md={12} lg = {4} xs = {12} className = "text-center">
                    <div className='customCard'>
                    <div className = 'image'>
                    <img src={light}  alt="light" />;      
                    </div>                 
                    <div className = 'card-content'>
                        <h1>Lighting 35°C </h1>
                    </div>
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-light">Measure Again</Button>{' '}
                    <div class="space">
                    </div>
                    <Button size = 'md' variant="warning">Turn on the light</Button>{' '}
                    </div>
                    </div>
                </Col>
                <Col md={12} lg = {4} xs = {12} className = "text-center">
                    <div className='customCard'>
                    <div className = 'image'>
                    <img src={irri}  alt="irri" />;      
                    </div>                 
                    <div className = 'card-content'>
                        <h1>Irrigation 35°C </h1>
                    </div>
                    <br></br>
                    <div className='button-group'>
                    <Button size = 'md' variant="outline-light">Measure Again</Button>{' '}   
                    <div class="space">
                    </div>
                    <Button size = 'md' variant="primary">Water the tree</Button>{' '}
                    </div>
                    </div>

                </Col>

                </Row>
        </Container>



    </Container>



        )

};

export default Climate;