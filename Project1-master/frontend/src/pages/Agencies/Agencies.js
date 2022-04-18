import React, {useEffect, useState} from 'react'
import Navigation from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import './Agencies.css'
import {Container} from "react-bootstrap";
import { MDBDataTable } from 'mdbreact';
import {Link} from 'react-router-dom';
import {FaExternalLinkSquareAlt} from "react-icons/fa";
import Axios from "axios";


function AgenciesPage() {
    const [agencyAttributes, setAgencyAttributes] = useState([])
    const agencies = []

    useEffect(() => {
        Axios.get('/api/agencies')
            .then(response => {
                console.log(response.data.agencies)
                setAgencyAttributes(response.data.agencies)
            });
    }, []);

    agencyAttributes.forEach(agency => {
        agencies.push({
            name: [agency.name, <Link to={`/agencies/${agency.agency_id}`}><FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            country_code: agency.country_code,
            type: agency.type,
            successful_launches: agency.successful_launches,
            total_launch_count: agency.total_launch_count,
            founding_year: agency.founding_year,
            wiki_url: <a href={agency.wiki_url}>Wiki</a>,
        })
    });

        const data = {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'Type',
                        field: 'type',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'Total Launch Count',
                        field: 'total_launch_count',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Successful Launches',
                        field: 'successful_launches',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Founding Year',
                        field: 'founding_year',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'Wiki URL',
                        field: 'wiki_url',
                        sort: 'asc',
                        width: 150
                    },
                ],
                rows: agencies
        };

            return (

        <div>
            <head><link rel="stylesheet" href="Agencies.css"></link></head>
            <Navigation/>
                <div class = "header1"></div>

            <Container fluid={true} className='justify-content-center'>
                <h1 className="text-center">Agencies</h1>
                <p className="text-center text-dark">
                    Click the icons in the table below to learn more about specific launches.
                    Click any column header to sort.
                </p>
                <MDBDataTable
                striped
                bordered
                small
                data={data}
                noBottomColumns={true}
                />
            </Container>

            <br></br>
            <Footer/>
        </div>

    )
}

export default AgenciesPage
