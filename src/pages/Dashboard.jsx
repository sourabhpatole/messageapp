// import React, { useContext, useEffect } from "react";
import Mainheading from "../components/Main-Heading/Main-heading";
import "../components/Dashboard-Value/dashboardvalue.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { DChart, LChart } from "../components/chart/Doughnutchart";
// import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  // localStorage.setItem("data", false);
  // const token = localStorage.getItem("userdatatoken");

  // // const [loginData,setLoginData]=useContext(AuthContext)
  // const validUser = async () => {
  //   const res = fetch("https://mernauth-stpy.onrender.com/validuser", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", Authorization: token },
  //   });
  //   const sourabh = await res

  //   console.log(sourabh);
  //   console.log(token);
  // };
  // useEffect(() => {
  //   validUser();
  // }, []);
  const [lres, setLRes] = useState([]);
  const [dres, setDres] = useState([]);
  const fetReslunch = () => {
    // setInterval(() => {
    axios
      .get("http://localhost:8009/message/reclunch", {
        headers: { Authorization: localStorage.getItem("userdatatoken") },
      })
      .then((res) => {
        setLRes(res.data);
      })

      .catch((err) => console.log(err));
    // }, 5000);
  };
  const fetResDinner = () => {
    // setInterval(() => {
    axios
      .get("http://localhost:8009/message/recdinner", {
        headers: { Authorization: localStorage.getItem("userdatatoken") },
      })

      .then((res) => {
        setDres(res.data);
      })

      .catch((err) => console.log(err));
    // }, 5000);
  };

  useEffect(() => {
    fetResDinner();
    fetReslunch();
  }, []);

  const lvegDataCount = lres.filter(
    (data) => data.foodChoice == "lunch-veg"
  ).length;
  const dvegDataCount = dres.filter(
    (data) => data.foodChoice == "dinner-veg"
  ).length;
  const lnonVegDataCount = lres.filter(
    (data) => data.foodChoice == "lunch-non-veg"
  ).length;
  const dnonVegDataCount = dres.filter(
    (data) => data.foodChoice == "dinner-non-veg"
  ).length;

  return (
    <div>
      <Mainheading name="Dashboard" />
      <div className="dashboard-div">
        <div className="leftSideDash">
          <LChart veg={lvegDataCount} nonveg={lnonVegDataCount} />
          {/* <DashboardValue veg={lvegDataCount} nonveg={lnonVegDataCount} /> */}
        </div>
        <div className="leftSideDash">
          <DChart veg={dvegDataCount} nonveg={dnonVegDataCount} />
          {/* <DashboardValue veg={dvegDataCount} nonveg={dnonVegDataCount} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
