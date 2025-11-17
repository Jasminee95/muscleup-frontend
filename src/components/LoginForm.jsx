import React, { useState } from "react";
import { loginUser } from "../services/api.js";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      window.location.href = "/me";  
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3 className="text-center mb-3">Log In</h3>
      {error && <p className="text-danger">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-danger w-100" type="submit">
        Log In
      </button>
    </form>
  );
}
