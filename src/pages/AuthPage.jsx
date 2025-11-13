import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Button } from "react-bootstrap";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0a0a0a, #1a1a1a)",
        color: "white",
      }}
    >
      <h1 className="mb-3 text-danger fw-bold">MUSCLEUP</h1>
      {message && <p className="text-warning">{message}</p>}

      <div
        className="auth-box p-4 rounded shadow-lg"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,30,30,0.3)",
          width: "400px",
        }}
      >
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center mt-3">
          <Button variant="outline-danger" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Already have an account?"}
          </Button>
        </div>
      </div>
    </div>
  );
}
