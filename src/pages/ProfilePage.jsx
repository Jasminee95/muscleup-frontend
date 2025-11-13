import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../services/api";
import strongWomanImg from "../assets/strongWoman.jpeg";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() =>
        navigate("/auth", { state: { message: "You must log in first." } })
      );
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth", { state: { message: "You have been logged out." } });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="homepage">
      <div className="overlay">
        <Container className="text-center text-light">
          {user ? (
            <>
              <h2>Welcome, {user.username}!</h2>

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

              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="mt-4"
              >
                Log out
              </Button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </Container>
      </div>
    </div>
  );
}

