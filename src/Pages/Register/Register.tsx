import React, { useState } from "react";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import config from "../../Api/config";

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
        navigate("/dashboard", { state: { result } });
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
          {/* <img
            className="picture"
            style={{ width: "230px", height: "165px" }}
            src={Logo}
            alt="Logo"
          /> */}
          <h1 className="welcome">ADMIN PANEL</h1>
          <p className="detail">Control Panel Registration</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <p>Name</p>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p>Email</p>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p>Phone Number</p>
            <input
              className="input"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <p>Password</p>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p>Confirm Password</p>
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

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
