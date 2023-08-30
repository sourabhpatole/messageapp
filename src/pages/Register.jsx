// import React, { createContext } from "react";
import Header from "../components/Header";
import Input from "../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../app.css";

const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function Register() {
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState('');
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const { updateToken } = useContext(AuthContext);

  // localStorage.setItem("data", false);
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const user = { name, email, password, cpassword };
  //   axios
  //     .post(
  //       "http://localhost:8009/register",
  //       name,
  //       password,
  //       email,
  //       cpassword,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     )
  //     .then((response) => console.log(response));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:8009/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ name, email, password, cpassword }),
    });
    const response = await data.json();
    console.log(response);
    if (response.status === 201) {
      console.log("Registration successful");
      navigate("/");
    } else {
      console.log("Registration unsuccessful");
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
            label="Name"
            type="name"
            value={name}
            id="Email"
            name="email"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            onBlur={validateEmail}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            value={cpassword}
            name="password"
            placeholder="********"
            onChange={(e) => setCpassword(e.target.value)}
            error={passwordError}
          />

          <button className="login-button" type="Submit">
            register
          </button>
          <p className="bottom-link">
            Already have account &nbsp;
            <Link to="/">
              <button className="login-button">Login</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Register };
