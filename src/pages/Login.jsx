// import React, { createContext } from "react";
import Header from "../components/Header";
import Input from "../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../app.css";

const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // localStorage.setItem("data", false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:8009/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await data.json();

    const tokenauth = response.result.token;

    if (response.status === 201) {
      console.log("login successful");
      localStorage.setItem("userdatatoken", tokenauth);
      navigate("/main/dashboard");
      setEmailError("");
      setPasswordError("");
      // updateToken(tokenauth);
      // localStorage.setItem("data", true);
    } else if (response.status !== 201) {
      setEmailError("Invalid email address.");
      setPasswordError("Invalid Password");
    } else {
      console.log("login unsuccessful");
      setEmailError("Invalid email address.");
      setPasswordError("Invalid Password");
    }
  };

  const validateEmail = () => {
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="login-screen">
      <div className="container">
        <Header />
        <form
          className="form"
          method="POST"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            id="Email"
            name="email"
            placeholder="email@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={emailError}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            name="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            error={passwordError}
          />

          <button className="login-button" type="Submit">
            Login
          </button>
          <p className="bottom-link">
            Need and account? &nbsp;
            <Link to="/register">
              <button className="login-button">Register</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Login };
