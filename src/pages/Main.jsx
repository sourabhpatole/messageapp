import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../main.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "../components/Sidebar/sidebar.css";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import Templates from "./Templates";
import Users from "./Users";
import Settings from "./Settings";
import { Login } from "./Login";
import MessageBoard from "./MessageBoard";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import Error from "../components/Error";

function Main() {
  const [loginData, setLoginData] = useContext(AuthContext);
  console.log(loginData);
  const navigate = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");
    // console.log(token);
    const res = await fetch("https://mernauth-stpy.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 401 || !data) {
      // console.log("Error page redirect");
      navigate("*");
    } else {
      // console.log("User verify");
      setLoginData(data.validUserOne);

      // console.log(data.validUserOne.name);
      navigate("/main/dashboard");
    }
  };
  useEffect(() => {
    DashboardValid();
    //   historyDetails();
    //   // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="main-div">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="main/dashboard" element={<Dashboard />}></Route>
              <Route path="main/reports" element={<Reports />}></Route>
              <Route path="main/templates" element={<Templates />}></Route>
              <Route path="main/users" element={<Users />}></Route>
              <Route path="main/settings" element={<Settings />}></Route>
              <Route
                path="main/messagecenter"
                element={<MessageBoard />}
              ></Route>
              <Route path="/" element={<Login />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
