import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "../styles/Navbar.css";

export default function AppNavbar() {
  return (
     <Navbar expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="navbar-logo">
          MUSCLEUP
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/">Hjem</Nav.Link>
          <Nav.Link href="/plans">Planer</Nav.Link>
          <Button href="/me"variant="outline-danger" className="ms-3">
            Profile
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}