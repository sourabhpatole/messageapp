import React, { useEffect } from "react";
import Mainheading from "../components/Main-Heading/Main-heading";
import "./styles/users.css";
import Button from "../components/Button";
import createTeamImgWhite from "./images/create-team-white.png";
import createUserImgWhite from "./images/create-user-white.png";
import { useState } from "react";
import CreateUser from "./CreateUser";
import Search from "../components/search/Search.jsx";
import Insights from "../components/Insights";
import EmployeeCard from "../components/employee-card/EmployeeCard";
import CreateTeam from "./CreateTeam";
// import EditUser from "../components/EditUser/EditUser";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  // const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState([]);

  // const [groupData, setGroupData] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  const employeeData = async (url) => {
    const employeeFetch = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userdatatoken"),
      },
    });

    const responseData = await employeeFetch.json();
    setEmployees(responseData);
    setOriginalEmployees(responseData);
    // console.log(employees);
    return responseData;
  };
  console.log(employees);

  useEffect(() => {
    employeeData("https://mernauth-stpy.onrender.com/employee");
    // getGroupData("https://mernauth-stpy.onrender.com/group");
  }, []);

  const employeesCount = [];
  employees.map((item) => employeesCount.push(item));

  const employeesCountLength = employeesCount.length;

  const employeesActive = [];
  const employeesInactive = [];

  employees.map((item) => {
    if (item.isActive === true) {
      return employeesActive.push(item);
    } else {
      return employeesInactive.push(item);
    }
  });

  const employeesActiveLength = employeesActive.length;
  const employeesInactiveLength = employeesInactive.length;

  // console.log(employeesActive);
  // console.log(employeesInactive);
  // console.log(isSubmitted);

  const employeesBranches = [];

  employees.map((item) => employeesBranches.push(item.location));

  const employeesBranchCount = (employees) => {
    const counts = {};
    for (const item of employees) {
      const branches = item.location;

      if (!counts.hasOwnProperty(branches)) {
        counts[branches] = 1;
      } else {
        counts[branches]++;
      }
    }
    return counts;
  };

  const counts = employeesBranchCount(employees);

  var branchLength = Object.keys(counts).length;

  const INSIGHTS_DIV = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 40px",
    margin: "20px 0 0 0",
  };

  const EMPLOYEES_DETAILS = {
    width: "100%",
    height: "63%",
    padding: "0 40px",
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    overflowX: "hidden",
    overflowY: "scroll",
  };

  const keys = ["fname", "lname", "location"];

  // let  searchedData = null;

  // const search = (data, searchTerm) => {
  //    searchedData = data.filter((item) =>
  //         keys.some((key) => item[key].toLowerCase().includes(searchTerm))
  //       );

  //   // for (let i=0; i < employees.length; i++){
  //   //     let searchTerm = '';
  //   //     let searchValue = '';

  //   // }

  //     setEmployees(searchedData);
  //     if(searchTerm === ""){
  //       setEmployees(originalEmployees);
  //       console.log(employees);
  //     }
  // }

  const search = (data, searchTerm, keys) => {
    const searchedData = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      // console.log(item);
      let found = false;

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        // console.log(key);
        const value = item[key].toLowerCase();
        // console.log(value);

        if (value.includes(searchTerm.toLowerCase())) {
          found = true;
          break;
        }
      }

      if (found) {
        searchedData.push(item);
        setEmployees(searchedData);
      }

      if (searchTerm === "") {
        setEmployees(originalEmployees);
        console.log(employees);
      }
    }

    return searchedData;
  };

  // const groupD = employees.map(e=>(e.group))
  // console.log(groupD)

  return (
    <>
      <div className="user-section-div">
        <div className="user-sub-div">
          <header className="user-header">
            <Mainheading name="User" />
            <div className="header-buttons">
              <Button
                name="Create-user"
                imgSrc={createUserImgWhite}
                imgName="create-user-img"
                className="create-user-button"
                onClick={() => setIsOpen(true)}
              />

              <Button
                name="Create-group"
                imgSrc={createTeamImgWhite}
                imgName="create-team-img"
                className="create-team-button"
                onClick={() => setIsTeam(true)}
              />
            </div>
          </header>

          <Search
            onChange={(e) =>
              search(employees, e.target.value.toLowerCase(), keys)
            }
          />

          <div className="insights-div" style={INSIGHTS_DIV}>
            <Insights name="No. of Employees:" value={employeesCountLength} />

            <Insights
              name="No. of Active Employees:"
              value={employeesActiveLength}
            />

            <Insights
              name="No. of Inactive Employees:"
              value={employeesInactiveLength}
            />

            <Insights name="No. of Branches:" value={branchLength} />
          </div>

          <div className="employee-details-div" style={EMPLOYEES_DETAILS}>
            {console.log("employees", employees)}
            {employees.map((item, index) => (
              <EmployeeCard
                fname={item.fname}
                lname={item.lname}
                key={index}
                email={item.email}
                branch={item.location}
                group={item.group}
                phoneNumber={item.mobile}
                active={item.isActive}
                id={item._id}
                employeeData={employeeData}
              />
            ))}
          </div>

          <div className="user-data-div"></div>
        </div>
      </div>

      <CreateUser
        open={isOpen}
        isSubmit={() =>
          employeeData("https://mernauth-stpy.onrender.com/employee")
        }
        onClose={() => setIsOpen(false)}
      />

      <CreateTeam
        open={isTeam}
        isSubmit={() =>
          employeeData("https://mernauth-stpy.onrender.com/employee")
        }
        onClose={() => setIsTeam(false)}
      />
    </>
  );
};

export default Users;
