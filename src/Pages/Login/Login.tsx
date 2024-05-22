import React, { useState } from "react";
import "./Login.css";
// import Logo from "../../assets/Images/logo_itc.svg";
import { useNavigate } from "react-router-dom";

import { authenticate } from "../../Auth/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authenticate(email, password);
      console.log("Login successful:", response);

      navigate("/Calendar");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  // const handleLogout = () => {
  //   logout();
 
  //   navigate("/");
  // };

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
          <h1 className="welcome">ADMIN PANEL</h1>
          <p className="detail">Control Panel Login</p>
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
              Login
            </button>
            <div
                  style={{
                    height: "40px",
                    width: "40px",
                    backgroundColor: "#DF6E1A",
                    borderRadius: "20px",
                    border: "1px solid #FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                log out
                </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
