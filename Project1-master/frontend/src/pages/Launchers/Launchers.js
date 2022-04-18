import React, {useEffect, useState} from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import './Launchers.css'
import {Container} from "react-bootstrap";
import { MDBDataTable} from 'mdbreact';
import {Link} from "react-router-dom";
import {FaExternalLinkSquareAlt} from "react-icons/fa";
import Axios from "axios";

function LaunchersPage() {
    const [launcherAttributes, setLauncherAttributes] = useState([])
    const launchers = []

    useEffect(() => {
        Axios.get('/api/launchers')
            .then(response => {
                setLauncherAttributes(response.data.launchers)
            });
    }, []);

    launcherAttributes.forEach(launcher => {
        launchers.push({
            name: [launcher.name, <Link to={`/launchers/${launcher.launcher_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            family: launcher.family,
            total_launch_count: launcher.total_launch_count,
            length: launcher.length,
            diameter: launcher.diameter,
            agency_id: [launcher.agency_id, <Link to={`/agencies/${launcher.agency_id}`}><FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>]
        })
    });

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
            },
            {
                label: 'Family',
                field: 'family',
                sort: 'asc',
            },
            {
                label: 'Total Launch Count',
                field: 'total_launch_count',
                sort: 'asc',
            },
            {
                label: 'Length (meters)',
                field: 'length',
                sort: 'asc',
            },
            {
                label: 'Diameter (meters)',
                field: 'diameter',
                sort: 'asc',
            },

            {
                label: 'Agency',
                field: 'agency_id',
                sort: 'asc',
            }
        ],
        rows: launchers
    };

    return(
        <div>
            <Navigation/>
                <div class = "header2"></div>

            <Container fluid = {true} className="justify-content-center">
                <h1 className="text-center">Spacecrafts</h1>
                <p className="text-dark text-center">Click the icons in the table below to learn more about various spacecrafts and their launches and agencies. To sort, click on column headers.</p>
                <MDBDataTable
                    striped
                    bordered
                    data={data}
                    small
                    noBottomColumns={true}


                />
            </Container>
            <br></br>
            <Footer/>
        </div>

    )
}

export default LaunchersPage

