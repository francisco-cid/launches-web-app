import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './Footer.css'

function Footer() {

  return (
      <footer className="bg-dark text-light">
          <Container fluid>
              <Row className="justify-content-center">
                  Copyright © 2021 Launched
              </Row>
          </Container>
      </footer>
  )
} 

export default Footer