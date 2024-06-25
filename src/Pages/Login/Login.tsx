import React, { useState } from "react";
import "./Login.css";
// import Logo from "../../assets/Images/logo_itc.svg";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Auth/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await authenticate(email, password);
      console.log("Login successful:", response);

      // Navigate based on user role
      if (response.role === "admin") {
        setLoading(false);
        navigate("/dashboard");
      } else {
        setLoading(false);
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div style={{ backgroundColor: "black" }} className="row">
      <div className="login">
        <div className="header">
          {/* <img
            className="picture"
            style={{ width: "230px", height: "165px" }}
            src={Logo}
            alt="Logo"
          /> */}
          <h1 className="welcome">Login</h1>
          <p className="detail">Welcome to Smart Voyage </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <p className="email">Email</p>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="title">Password</p>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit">
              {loading ? <p>Loading...</p> : <p> Login</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
