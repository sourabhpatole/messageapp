import React from "react";
import "./employeecard.css";
import ToggleButton from "../toggle-button/ToggleButton";
import editImg from "./images/edit.png";
import deleteImg from "./images/delete.png";
import { useState } from "react";
import EditUser from "../EditUser/EditUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import { useEffect } from "react";
import axios from "axios";

const EmployeeCard = ({
  fname,
  lname,
  email,
  branch,
  group,
  phoneNumber,
  active,
  id,
  employeeData,
}) => {
  console.log(typeof fname);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [groupName, setGroupName] = useState([]);

  // const findGroupbyId = () => {};

  const getgroupName = () => {
    axios
      .get("https://mernauth-stpy.onrender.com/group", {
        headers: { Authorization: localStorage.getItem("userdatatoken") },
      })
      .then((res) => setGroupName(res.data));
  };
  // console.log("Sourabhpatoleso", groupName);
  // console.log("patolesourabh", group[0]);

  // const filterGoupData = groupName.map((item) => item._id);
  // const intersection = filterGoupData.filter((item) => group[0].includes(item.id));
  // console.log(intersection);
  // console.log(filterGoupData);
  // console.log(filterGoupData)

  const result = groupName.filter((item) => {
    // console.log(item._id.toString());
    // console.log(group[0].toString(""));
    return group[0].includes(item._id);
  });
  useEffect(() => {
    getgroupName();
    // findGroupbyId();
  }, []);

  return (
    <>
      <div className="employee-card">
        <div className="first-div">
          <div className="employee-header">
            <div className="employee-header-left">
              <div className="card-rect"></div>
              <div className="name-location-div">
                <div className="employee-name">{fname + " " + lname}</div>
                <div className="location">{branch}</div>
              </div>
            </div>
            <div className="employee-header-right">
              <div className="status-text">Status :</div>
              <div className="toggle-button-div">
                <div className="toggle-button">
                  <ToggleButton
                    email={email}
                    employeeData={employeeData}
                    isActive={active}
                    id={id}
                  />
                </div>
                <div className="status"></div>
              </div>
            </div>
          </div>

          <div className="first-wrapper">
            <div className="left-wrapper">
              <div className="phonenumber-heading">Phone Number</div>
              <div className="phonenumber-value">{phoneNumber}</div>
            </div>
            <div className="right-wrapper">
              <div className="employee-id-heading">Group</div>

              {result.map(function (item) {
                return (
                  <div className="employee-id-value">{item.groupName}</div>
                );
              })}
            </div>
          </div>

          <div className="second-wrapper">
            <div className="left-wrapper">
              <div className="email-heading">Email</div>
              <div className="email-value">{email}</div>
            </div>
          </div>
        </div>

        <div className="second-div">
          <div className="customise-div">
            <div className="edit-button-div" onClick={() => setIsEdit(true)}>
              <img src={editImg} alt="Edit" className="edit-user" />
            </div>
            <div
              className="delete-button-div"
              onClick={() => setIsDelete(true)}
            >
              <img src={deleteImg} alt="Delete" className="delete-user" />
            </div>
          </div>
        </div>
      </div>
      <EditUser
        open={isEdit}
        isSubmit={() =>
          employeeData("https://mernauth-stpy.onrender.com/employee")
        }
        onClose={() => setIsEdit(false)}
        email={email}
        fname={fname}
        lname={lname}
        branch={branch}
        phoneNumber={phoneNumber}
        group={group}
        active={active}
        id={id}
        employeeData={employeeData}
      />

      <DeleteUser
        open={isDelete}
        isSubmit={() =>
          employeeData("https://mernauth-stpy.onrender.com/employee")
        }
        onClose={() => setIsDelete(false)}
        id={id}
        email={email}
        active={active}
        employeeData={employeeData}
      />
    </>
  );
};

export default EmployeeCard;
