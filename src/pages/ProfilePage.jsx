import React from "react";
import { Container } from "react-bootstrap";
import "../styles/HomePage.css";
import strongWomanImg from "../assets/strongWoman.jpeg";

export default function ProfilePage() {

  return (
    <div className="homepage">
      <div className="overlay">
        <Container className="text-center text-light">

          <h2 className="mt-3 text-uppercase fw-semibold text-danger">
            Push harder than yesterday if you want a different tomorrow
          </h2> 
      
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