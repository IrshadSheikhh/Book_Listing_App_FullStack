import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
     else {
      navigate("/");
     }

    try {
      await axios.post("https://book-listing-app-backend-irshad3.onrender.com/api/register", {
        name,
        email,
        password,
      });
     
    } catch (err) {
      setError(err.message);
    }
  }


return (
  <div className="container mt-5">
<h2>Register</h2>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label>Name:</label>
<input
type="text"
className="form-control"
placeholder="Enter name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
</div>
<div className="form-group">
<label>Email:</label>
<input
type="email"
className="form-control"
placeholder="Enter email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</div>
<div className="form-group">
<label>Password:</label>
<input
type="password"
className="form-control"
placeholder="Enter password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<div className="form-group">
<label>Confirm Password:</label>
<input
type="password"
className="form-control"
placeholder="Confirm password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
/>
</div>
{error && <div className="alert alert-danger">{error}</div>}
<button type="submit" className="btn btn-primary">
Register
</button>
</form>
<p className="mt-3">
Already have an account? <Link to="/">Login</Link>
</p>
</div>
);
};


export default Register;  