import React, { useState } from "react";
import { registerUser } from "../services/api.js";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, email, password });
      setMessage(res.message);
    } catch (err) {
      setMessage(err.error || "Error: Could not register user.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3 className="text-center mb-3">Create Account</h3>
      {message && <p className="text-info">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        className="form-control mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        Register
      </button>
    </form>
  );
}
