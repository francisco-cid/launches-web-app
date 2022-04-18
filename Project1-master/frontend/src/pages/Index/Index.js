import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import {Container, Row, Col} from "react-bootstrap"
import './index.css'
import { Link } from 'react-router-dom'

function IndexPage() {
  return (
    <div>
      <Navbar/>
        <Container fluid>
          <div className="positionRel">
            <Row className="splashLaunch backgroundCover">
              <Col>
                <br></br>

                <Link className="splash" to="/launches">
                  <h1  className="right splashHeading"> Launches </h1>
                </Link>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Col>
            </Row>
            <Row className="splashSpacecraft backgroundCover">
              <Col>
                <br></br>

                <Link className="splash" to="/launchers">
                  <h1  className="left splashHeading"> Spacecrafts </h1>
                </Link>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Col>
            </Row>
            <Row className="splashAgencies backgroundCover">
              <Col>
                <br></br>
                <Link className="splash" to="/agencies">
                  <h1  className="right splashHeading"> Agencies </h1>
                </Link>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Col>
            </Row>
          </div>
        </Container>
      <Footer/>
    </div>
  )
  
} 

export default IndexPage