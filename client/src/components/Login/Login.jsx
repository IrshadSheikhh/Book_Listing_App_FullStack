import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://book-listing-app-backend-irshad3.onrender.com/api/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setLoggedIn(true);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert">{error}</div>}
          <div className="login-btn-container">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;