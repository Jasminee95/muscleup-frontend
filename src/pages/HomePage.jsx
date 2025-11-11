import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "../styles/HomePage.css";
import strongWomanImg from "../assets/strongWoman.jpeg";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
    
  };

  return (
    <div className="homepage">
      <div className="overlay">
        <Container className="text-center text-light">

          <h2 className="mt-3 text-uppercase fw-semibold text-danger">
            Push harder than yesterday if you want a different tomorrow
          </h2> 
      
          <h3 className="mt-5 fw-bold">
            FIND EXERCISES
            <br />
            FOR ALL MUSCLE GROUPS
        
          </h3>
         
          <Row className="justify-content-center mt-4">
            {["Chest", "Back", "Arms", "Legs", "Shoulders", "Abs"].map(
              (muscle) => (
                <Col xs="auto" key={muscle}>
                  <Button variant="outline-danger" className="muscle-btn m-2">
                    {muscle}
                  </Button>
                </Col>
              )
            )}
          </Row>

          <Form
            onSubmit={handleSearch}
            className="mt-4 d-flex justify-content-center"
          >
            <Form.Control
              type="text"
              placeholder="Search for a muscle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </Form>
                   <div className="bottom-image mt-5">
            <img
              src={strongWomanImg}
              alt="strong-woman"
              className="img-fluid"
            />
          </div>
          
        </Container>
      </div>
    </div>
  );
}
