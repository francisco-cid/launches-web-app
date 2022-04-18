import React, {useEffect, useState} from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import { Image, Container, Row, Col, Card, Jumbotron} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Axios from "axios";

function LauncherDetailPage({ match }) {
    const [launcher, setLauncher] = useState([])
    const [launches, setLaunches] = useState([]);
    const [agencies, setAgencies] = useState([]);

    useEffect(()=>{
        let i;
        const launchesList = []
        for (i = 0; i < launcher.launches_name?.length; i++) {
            const path = "/launches/"+launcher.launches_id[i]
            launchesList.push(<Card.Text className='text-muted'><Link to = {path}> {launcher.launches_name[i]} </Link></Card.Text>)
        }
        setLaunches(launchesList)
    },[launcher])

    useEffect(()=>{
            const path = "/agencies/"+launcher.agency_id
            let agency = (<Card.Text className='text-muted'><Link to = {path}> {launcher.agency_name} </Link></Card.Text>)
        setAgencies(agency)
    },[launcher])


    useEffect(() => {
        Axios.get(`/api/launchers/${match.params.launcher_id}`)
            .then(response => {
                console.log(response.data)
                setLauncher(response.data.launcher[0])
            });
    }, []);

    return (
        <div>
            <Navigation />

            <Jumbotron fluid name="title">
                <div className="m-4">
                <h1 className="display-3">{launcher.name}</h1>

                    <h4 className = "display-5">{launcher.description}</h4>

                </div>
            </Jumbotron>
            <Container fluid name="content">
                <Row>
                    <Col name="info_box" className="col-sm-8 col-md-8 col-lg-8">
                        <Row className="row">
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="date-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">General Info</Card.Title>
                                        <hr className="my-4"/>

                                        <Card.Text className="text-muted">Name: {launcher.name}</Card.Text>
                                        <Card.Text className="text-muted">Spacecraft Family: {launcher.family}</Card.Text>
                                        <Card.Text className="text-muted">Spacecraft Variant: {launcher.variant}</Card.Text>
                                        <Card.Text className="text-muted">Wiki: {launcher.wiki_url}</Card.Text>


                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="status-card" >
                                    <Card.Body className="card-body">
                                        <Card.Title>Spacecraft Info</Card.Title>
                                        <hr className="my-4"/>
                                        <Card.Text className="text-muted" >Spacecraft Diameter: {launcher.diameter}m</Card.Text>
                                        <Card.Text className="text-muted" >Spacecraft Length: {launcher.length}m</Card.Text>
                                        <Card.Text className="text-muted" >Launch Cost Flight: {launcher.launch_cost}</Card.Text>
                                        <Card.Text className="text-muted" >Launch Mass: {launcher.launch_mass}kg</Card.Text>
                                        <Card.Text className="text-muted" >Thrust: {launcher.to_thrust}</Card.Text>
                                        <Card.Text className="text-muted" >Total Launch Count: {launcher.total_launch_count}</Card.Text>
                                        <Card.Text className="text-muted" >Consecutive Successful Launches: {launcher.consecutive_successful_launches}</Card.Text>
                                        <Card.Text className="text-muted" >Successful Launches: {launcher.successful_launches}</Card.Text>
                                        <Card.Text className="text-muted" >Failed Launches: {launcher.failed_launches}</Card.Text>



                                    </Card.Body>
                                </Card>
                            </Col>
                            <div className="w-100"></div>
                            <Col className="col-sm-12 col-md-12 col-lg-12">
                                <Card name="rocket-card" className="card mb-3">
                                    <Card.Header className="card-header">Launches</Card.Header>
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title"><Link to="/launches">{launches}</Link></Card.Title>
                                        <Card.Subtitle className="card-subtitle text-muted"></Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col name="pillar_box" className="col-sm-4 col-md-4 col-lg-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Spacecraft Image</Card.Title>
                            </Card.Body>
                            <Image className="card-img-bottom" src={launcher.image_url ? launcher.image_url : 'https://i.imgur.com/718UbeW.png'}
                                   alt="Card image cap"/>
                        </Card>

                        <Card name="agency-card" className="card">
                            <Card.Header className="card-header">Agency</Card.Header>
                            <Card.Body className="card-body">
                                <Card.Title className="card-title"><Link to="/agencies">{agencies}</Link></Card.Title>
                                <Image style={{maxHeight: '500px'}} className="img-fluid mx-auto d-block" src={launcher.agency_image}/>
                                <Card.Subtitle className="card-subtitle text-muted"></Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Footer />
        </div>

    )
}

export default LauncherDetailPage