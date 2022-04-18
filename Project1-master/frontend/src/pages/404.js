import React from 'react'
import { Container, Row, Col, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Container>
        <Row>
            <Col className="col-md-12 text-center mt-4">
                <h3>404 - Not Found</h3>
                <p class="text-danger">An error has occurred. The requested page was not found!</p>
                <Button as={Link} to="/" className="btn btn-dark btn-lg">
                    Go Home
                </Button>
            </Col>
        </Row>
    </Container>
  )
} 

export default NotFoundPage