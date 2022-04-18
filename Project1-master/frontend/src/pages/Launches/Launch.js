import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import { Image, Container, Row, Col, Card, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { compose, withProps} from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import Axios from 'axios'

function LaunchDetailPage({ match }) {
    const [launch, setLaunch] = useState([])

    useEffect(() => {
        Axios.get(`/api/launches/${match.params.launch_id}`)
            .then(response => {
                setLaunch(response.data.launch[0])
            });
        }, []);

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
    )(
        (props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: launch.lat, lng: launch.lng}}
            >
                {props.isMarkerShown && <Marker position={{ lat: launch.lat, lng: launch.lng}} />}
            </GoogleMap>
)



    return (
        <div>
            <Navigation />
            <Jumbotron fluid name="title">
                <h1 className="display-3">{launch.name}</h1>
                <hr className="my-4"/>

                    <Image style={{maxHeight: '500px'}} className="img-fluid mx-auto d-block" src={launch.image ? launch.image : 'https://i.imgur.com/718UbeW.png'}/>

            </Jumbotron>

            <Container fluid name="content">
                <Row>
                    <Col name="info_box" className="col-sm-8 col-md-8 col-lg-8">
                        <Row className="row">
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="date-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">Date & Time</Card.Title>
                                        <hr className="my-4"/>
                                            <Card.Subtitle className=" text-dark">Start Time</Card.Subtitle>
                                            <Card.Text className="mb-2 text-dark">{launch.window_start}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="status-card" >
                                    <Card.Body className="card-body">
                                        <Card.Title>Status</Card.Title>
                                        <hr className="my-4"/>
                                            <Card.Subtitle className="text-dark" >{launch.status_name}</Card.Subtitle>
                                            <Card.Text className="mb-2 text-dark">{launch.status_description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <div className="w-100"></div>
                            <Col className="col-sm-12 col-md-12 col-lg-12">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Launch Pad</Card.Title>
                                        <Card.Text className="text-muted">Name: {launch.pad_name}</Card.Text>
                                        <Card.Text className="text-muted"><a href={launch.map_url}>Map</a></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col name="map_box" className="col-sm-12 col-md-12 col-lg-12">
                            <MyMapComponent isMarkerShown />
                            </Col>
                        </Row>
                    </Col>
                    <Col name="pillar_box" className="col-sm-4 col-md-4 col-lg-4">
                        <Card name="rocket-card" className="card mb-3">
                            <Card.Header className="card-header">Spacecraft</Card.Header>
                            <Card.Body className="card-body">
                                <Card.Title className="card-title"><Link to={`/launchers/${launch.launcher_id}`}>{launch.launcher_name}</Link></Card.Title>
                            </Card.Body>
                        </Card>
                        <Card name="agency-card" className="card">
                            <Card.Header className="card-header">Agency</Card.Header>
                            <Card.Body className="card-body">
                                <Card.Title className="card-title"><Link to={`/agencies/${launch.agency_id}`}>{launch.agency_name}</Link></Card.Title>
                                <Image style={{maxHeight: '500px'}} className="img-fluid mx-auto d-block" src={launch.agency_image}/>
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

export default LaunchDetailPage