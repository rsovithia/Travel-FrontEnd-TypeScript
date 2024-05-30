import React, { useState } from "react";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import config from "../../Api/config";
import { Typography } from "@mui/material";
import { authenticate } from "../../Auth/auth";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);

        // Automatically log in the user after successful registration
        const loginResponse = await authenticate(email, password);
        console.log("Login successful:", loginResponse);

        // Navigate based on user role
        if (loginResponse.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        console.error("Registration failed:", response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div style={{ backgroundColor: "black" }} className="row">
      <div className="register">
        <div className="header">
          <h1 className="welcome">ADMIN PANEL</h1>
          <p className="detail">Control Panel Registration</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input-group">
              <Typography className="label">Name</Typography>
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <Typography className="label">Email</Typography>
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <Typography className="label">Phone Number</Typography>
              <input
                className="input"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <Typography className="label">Password</Typography>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <Typography className="label">Confirm Password</Typography>
              <input
                className="input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
