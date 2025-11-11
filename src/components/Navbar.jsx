import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "../styles/Navbar.css";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container fluid className="px-5 d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/" className="navbar-logo">
          MUSCLEUP
        </Navbar.Brand>

        <div className="nav-links d-flex align-items-center">
          <Nav.Link href="/" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link href="/plans" className="nav-link">
            Plans
          </Nav.Link>
          <Button href="/me" variant="danger" className="nav-btn ms-4">
            Profile
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
