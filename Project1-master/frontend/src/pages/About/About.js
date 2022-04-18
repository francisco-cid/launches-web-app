import React from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import './About.css'
import {Card, Container, Row, Table, Col, ListGroup} from "react-bootstrap";
import FranciscoProfile from "../../images/Francisco-Profile.png";
import AdnanProfile from "../../images/Adnan-Profile.jpg";
import CalebProfile from "../../images/Caleb-Profile.jpg";
import JamesProfile from "../../images/James-Profile.jpg";
import MaryamProfile from "../../images/Maryam-Profile.jpg";
import SamuelProfile from "../../images/Samuel-Profile.jpg";
import ReactLogo from "../../images/react.png";
import BootstrapLogo from "../../images/bootstrap.svg";
import FlaskLogo from "../../images/flask.png"
import PersonalIcon from "../../images/personal_icon.png"
import {FaLinkedin} from "react-icons/fa";

function AboutPage() {
    return (
        <div>
            <Navigation/>
                <Container>
                    <h1 class = "text-center">About</h1>
                    <p class = "text-dark text-center">This website was built as part of a project for
                        the CS331E Elements of Software Engineering II class at the University of Texas at
                        Austin.</p>
                    <div class="row justify-content-center">
                        <ListGroup horizontal>
                            <ListGroup.Item><a href="https://gitlab.com/ShinyGlaceon/cs331e-idb" target="_blank">GitLab Repository</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://gitlab.com/ShinyGlaceon/cs331e-idb/-/wikis/Phase-1-Technical-Report" target="_blank">GitLab Wiki</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://gitlab.com/ShinyGlaceon/cs331e-idb/-/issues" target="_blank">GitLab Issue Tracker</a></ListGroup.Item>
                            <ListGroup.Item><a href="/testresults">Run Unit Tests</a></ListGroup.Item>
                            <ListGroup.Item><a href= "https://speakerdeck.com/mahu005/launchedapp" target="_blank">Speaker Deck</a></ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div class="top-buffer">
                        <h5> Group 16 Members:</h5>
                    </div>
                    <Row className="flex-container">
                        <Col lg={4} md = {6} sm = {12}  className="bottom-buffer">
                            <Card className="h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={JamesProfile}/>
                                    <Card.Title> James Chen </Card.Title>
                                    <Card.Subtitle class="text-muted">Team Leader</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://www.cs.utexas.edu/~avalon/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Chemistry senior. Write codes when not making cool crystals.
                                    </div>
                                    <div>
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>Database Design</li>
                                            <li>Loading Database</li>
                                            <li>GCP Deployment</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>35</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col lg={4} md = {6} sm = {12} className="bottom-buffer">
                            <Card className="h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={SamuelProfile}/>
                                    <Card.Title> Samuel Pang </Card.Title>
                                    <Card.Subtitle class="text-muted">Front End Developer</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://www.cs.utexas.edu/~samuelp/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                            <a href="https://www.linkedin.com/in/samuel-pang-21a549b2" target="_blank"><FaLinkedin size={30}/></a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Economics student at UT Austin and CEO of Glaceon Island.
                                    </div>
                                    <div>
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>Splash Page</li>
                                            <li>Footer</li>
                                            <li>Front End Design</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col lg={4} md = {6} sm = {12} className="bottom-buffer">
                            <Card className="h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={FranciscoProfile}/>
                                    <Card.Title> Francisco Cid </Card.Title>
                                    <Card.Subtitle class="text-muted">Back End Developer</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://www.cs.utexas.edu/~fcid/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Physics student at UT Austin
                                        interested in the intersections of business, technology, and science.
                                    </div>
                                    <div>
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>Data Scraping</li>
                                            <li>Database Design</li>
                                            <li>Unit Testing</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>17</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col lg={4} md = {6} sm = {12} className="bottom-buffer">
                            <Card className="h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={AdnanProfile}/>
                                    <Card.Title> Adnan Desai </Card.Title>
                                    <Card.Subtitle class="text-muted">Back End Developer</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://www.cs.utexas.edu/~adnand/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                            <a href="https://www.linkedin.com/in/adnan-desai-a81a62157/" target="_blank"><FaLinkedin size={30}/></a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Mechanical engineering senior at UT Austin interested in robotics.
                                    </div>
                                    <div className="flexible">
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>Spacecrafts Page(s)</li>
                                            <li>Internal API Calls</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col lg={4} md = {6} sm = {12} className="bottom-buffer">
                            <Card className = "h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={MaryamProfile}/>
                                    <Card.Title> Maryam Hussaini </Card.Title>
                                    <Card.Subtitle class="text-muted">Front End Developer</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://maryamh8.wixsite.com/maryam" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Astronomy and physics student at UT Austin, enjoys doing scientific research.
                                    </div>
                                    <div className="flexible">
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>Dynamic Instance Pages</li>
                                            <li>Front End Design</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>7</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>15</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col lg={4} md = {6} sm = {12} className="bottom-buffer">
                            <Card className="h-100">
                                <Card.Body className="flex-card">
                                    <Card.Img class="rounded-circle" style={{width:"100px"}} src={CalebProfile}/>
                                    <Card.Title> Caleb Campbell </Card.Title>
                                    <Card.Subtitle class="text-muted">Front End Developer</Card.Subtitle>
                                    <div className="icon-buffer">
                                        <Card.Subtitle>
                                            <a href="https://www.cs.utexas.edu/~ccamp/" target="_blank"><Card.Img style={{width:"35px"}} src={PersonalIcon}/></a>
                                            <a href="https://www.linkedin.com/in/calcampbell" target="_blank"><FaLinkedin size={30}/> </a>
                                        </Card.Subtitle>
                                    </div>
                                    <div className="flexible">
                                        Sales Engineer and Software Developer passionate about
                                        creating business value through technology.
                                    </div>
                                    <div className="flexible">
                                        <hr></hr>
                                        Contributions and responsibilites:
                                        <ul>
                                            <li>RESTful API Design</li>
                                            <li>React installation and set up</li>
                                            <li>Routing </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>no. of commits</td>
                                        <td>27</td>
                                    </tr>
                                    <tr>
                                        <td>no. of issues</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>no. of unit tests</td>
                                        <td>3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                    <div>
                        <h5>Project Statistics</h5>
                    </div>
                    <Table>
                        <tr>
                            <td>total no. of commits</td>
                            <td>140</td>
                        </tr>
                        <tr>
                            <td>total no. of issues</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>total no. of unit tests</td>
                            <td>18</td>
                        </tr>
                    </Table>
                    <div>
                        <h5>Data Source(s)</h5>
                        <ul>
                            <li><a href='https://ll.thespacedevs.com/2.1.0/swagger' target="_blank">Launch Library API</a></li>
                            <li>API was scraped using load_json.py. Made a series of HTTP calls to the API,
                                saved the responses as python dictionaries, and then stored everything in JSON files to later load into database. </li>
                        </ul>
                    </div>
                    <div>
                        <h5>Tools Used</h5>
                        <ul>
                            <li>
                                <a href='https://ll.thespacedevs.com/2.1.0/swagger' target="_blank">React</a>
                                <img class="rounded-circle" style={{width:"50px"}} src={ReactLogo}/>
                            </li>
                            <li>
                                <a href="https://react-bootstrap.github.io" target="_blank">React Bootstrap</a>
                                <img style={{width: "50px"}} src={BootstrapLogo}/>
                            </li>
                            <li>
                                <a href="https://flask.palletsprojects.com/en/1.1.x/" target="_blank">Flask</a>
                                <img  style={{width: "50px"}} src={FlaskLogo}/>
                            </li>
                        </ul>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Container>
            <Footer/>
        </div>


  )
} 

export default AboutPage