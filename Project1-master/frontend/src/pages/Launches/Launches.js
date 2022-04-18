import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import './Launches.css'
import {Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact';
import {FaExternalLinkSquareAlt} from "react-icons/fa";
import Axios from 'axios'


function LaunchesPage() {
    const [launchAttributes, setLaunchAttributes] = useState([])
    const launches = []

    useEffect(() => {
        Axios.get('/api/launches')
            .then(response => {
                setLaunchAttributes(response.data.launches)
            });
        }, []);

    launchAttributes.forEach(launch => {
        launches.push({
            name: [launch.name, <Link to={`/launches/${launch.launch_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            launch_id: launch.launch_id,
            window_start: launch.window_start,
            status_abbrev: launch.status_abbrev,
            launcher_id: [launch.launcher_id, <Link to={`/launchers/${launch.launcher_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            agency_id: [launch.agency_id, <Link to={`/agencies/${launch.agency_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>]
        })
    });

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: '200',

            },
            {
                label: 'Date',
                field: 'window_start',
                sort: 'asc',
                width: '200'
            },
            {
                label: 'Status',
                field: 'status_abbrev',
                sort: 'ascending',
                width: '200'
            },
            {
                label: 'Spacecraft',
                field: 'launcher_id',
                sort: 'ascending',
                width: '200'
            },
            {
                label: 'Agency',
                field: 'agency_id',
                sort: 'ascending',
                width: '200'
            }
        ],
        rows: launches
    }

    return (
      <div>
          <Navigation />
            <div class = "header"></div>

          <Container fluid={true} className="justify-content-center">
              <h1 className="text-center">Launches</h1>
              <p className="text-center text-dark">
                  Click the icons in the table below to learn more about specific launches.
                  Click any column header to sort.
              </p>
            <MDBDataTable
                data={data} sorting={true} striped bordered small noBottomColumns={true}
            />
          </Container>
          <br></br>
          <Footer/>
      </div>
  )
} 

export default LaunchesPage