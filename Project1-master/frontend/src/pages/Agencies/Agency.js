import React, {useEffect, useState} from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import { Image, Container, Row, Col, Card, Jumbotron} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Axios from "axios";
function Agency({ match }) {
    const [agency, setAgency] = useState([])
    const [items, set_item] = useState([]);
    const [spacecrafts, set_spacecrafts] = useState([]);

    useEffect(()=>{
        let i;
        const spacecraftsList = []
        for (i = 0; i < agency.launcher_name?.length; i++) {
            const path = "/launchers/"+agency.launcher_id[i]
            spacecraftsList.push(<Card.Text className='text-muted'><Link to = {path}> {agency.launcher_name[i]} </Link></Card.Text>)
        }
        set_spacecrafts(spacecraftsList)
    },[agency])

    useEffect(()=>{
        let i;
        const element = []
        for (i = 0; i < agency.launches_name?.length; i++) {
            const path = "/launches/"+agency.launches_id[i]
            element.push(<Card.Text className='text-muted'><Link to = {path}> {agency.launches_name[i]} </Link></Card.Text>)
        }
        set_item(element)
    },[agency])
    
    useEffect(() => {
        Axios.get(`/api/agencies/${match.params.agency_id}`)
            .then(response => {
                setAgency(response.data.agency[0])
                console.log(response.data.agency[0])
                ;
            });
    }, []);

    return (
        <div>
            {/*{test(agency.agency_launches_name)}*/}
            <Navigation />
            <Jumbotron fluid name="title">
                <h1 className="display-3"> {agency.name}</h1>
                <hr className="my-4"/>
                <Image style={{maxHeight: '50%',maxWidth: '50%'}} className="rounded mx-auto d-block" src={agency.logo_url ? agency.logo_url : 'https://i.imgur.com/718UbeW.png'}/>
            </Jumbotron>
            <Container fluid name="content">
                <Row>
                    <Col name="info_box" className="col-sm-8 col-md-8 col-lg-8">
                        <Row className="row">
                            <Col name="pillar_box" className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="rocket-card" className="card mb-3">
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">General Info</Card.Title>
                                        <hr className="my-4"/>
                                        <Card.Text className="text-muted">Name: {agency.name}</Card.Text>
                                        <Card.Text className="text-muted">Country: {agency.country_code}</Card.Text>
                                        <Card.Text className="text-muted">Type: {agency.type}</Card.Text>
                                        <Card.Text className="text-muted">Founding Year: {agency.founding_year}</Card.Text>
                                        <Card.Text className="text-muted">Wiki: {agency.wiki_url}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="date-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">Launch Statistics</Card.Title>
                                        <hr className="my-4"/>
                                        <Card.Text className="text-muted">Total Launch Count: {agency.total_launch_count}</Card.Text>
                                        <Card.Text className="text-muted">Successful Launches: {agency.successful_launches}</Card.Text>
                                        <Card.Text className="text-muted">Consecutive Successful Launches: {agency.consecutive_successful_launches}</Card.Text>
                                        <Card.Text className="text-muted">Failed Launches: {agency.total_launch_count - agency.successful_launches}</Card.Text>
                                        <Card.Text className="text-muted">Successful Landings: {agency.successful_landings}</Card.Text>
                                        <Card.Text className="text-muted">Attempted Landings: {agency.attempted_landings}</Card.Text>
                                        <Card.Text className="text-muted">Consecutive Successful Landings: {agency.consecutive_successful_landings}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-sm-6 col-md-6 col-lg-6">
                                <Card name="status-card" >
                                    <Card.Body className="card-body">
                                        <Card.Title>Launches</Card.Title>
                                        <hr className="my-4"/>

                                        {items}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <div className="w-100"></div>
                            <Col className="col-sm-12 col-md-12 col-lg-12">
                            </Col>
                        </Row>
                    </Col>
                    <Col name="pillar_box" className="col-sm-4 col-md-4 col-lg-4">
                        <Card name="url-card" className="card mb-3">
                            <Card.Body className="card-body">
                                <Card.Title className="card-title">Spacecrafts </Card.Title>
                                <hr className="my-4"/>
                                {console.log({spacecrafts})}
                                {spacecrafts}
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
export default Agency
