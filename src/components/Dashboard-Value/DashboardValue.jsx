import React from "react";
import Subdiv from "./d-sub-div";
import "./dashboardvalue.css";
const DashboardValue = ({ veg, nonveg }) => {
  return (
    <div className="dashboard-main-div">
      <Subdiv value={nonveg} dataSentence={"People who said yes for Non-veg"} />
      <Subdiv value={veg} dataSentence={"People who said yes for Veg"} />
    </div>
  );
};

export default DashboardValue;
