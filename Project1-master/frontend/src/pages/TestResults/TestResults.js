import React, {useEffect, useState} from 'react'
import Axios from "axios";
import {Button, Card} from "react-bootstrap";

function TestResults(){

    const [TestResults, setTestResults] = useState([])
    useEffect(() => {
        Axios.get('/api/test')
            .then(response => {
                setTestResults(response.data.TestResults)
            });
    }, []);

    const timestamp = new Date(Date.now())
    return (

        <div>
            <Card>
                <Card.Title>Unit Test Results</Card.Title>
                <Card.Subtitle>{timestamp.toLocaleTimeString()}</Card.Subtitle>
                <Card.Body>Running... </Card.Body>
                <Card.Body><div dangerouslySetInnerHTML={{__html: TestResults}}></div></Card.Body>
            </Card>
            <Button href="/about"variant="primary">Back to About Page</Button>
        </div>


    )
}
export default TestResults