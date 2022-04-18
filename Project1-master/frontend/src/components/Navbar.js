import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
  <Navbar sticky="top" bg="dark" expand="md" variant="dark">
    <Navbar.Brand as={NavLink} to="/">Launched</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} to="/launches">Launches</Nav.Link>
        <Nav.Link as={NavLink} to="/launchers">Spacecrafts</Nav.Link>
        <Nav.Link as={NavLink} to="/agencies">Agencies</Nav.Link>
        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
} 

export default Navigation