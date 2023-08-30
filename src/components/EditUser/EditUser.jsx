import React from "react";
import Input2 from "../Input2/Input2";
import Button from "../Button";
import { useState } from "react";
import "./edituser.css";
import closeWhite from "../../pages/images/close-white.png";
import editUserImg from "./images/edit-user-white.png";
import Mainheading from "../Main-Heading/Main-heading";
import ReactDom from "react-dom";
import { useEffect } from "react";
import Select from "../Select/Select";

const EditUser = ({
  open,
  employeeData,
  id,
  onClose,
  fname,
  lname,
  branch,
  phoneNumber,
  group,
  email,
}) => {
  const [emailData, setEmailData] = useState(email);
  const [firstNameData, setFirstNameData] = useState(fname);
  const [lastNameData, setLastNameData] = useState(lname);
  const [branchData, setBranchData] = useState(branch);
  const [groupData, setGroupData] = useState(group);
  const [phoneNumberData, setPhoneNumberData] = useState(phoneNumber);
  // const [usergroup, setUserData] = useState([]);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\+?[0-9]{10}$/;
  const url = `https://mernauth-stpy.onrender.com/employee`;

  const getGroupData = async (url) => {
    const headers = {
      Authorization: localStorage.getItem("userdatatoken"),
    };

    const grpFetch = await fetch(url, {
      method: "GET",
      headers,
    });

    const grpData = await grpFetch.json();
    setGroupData(grpData);
    // console.log(grpData);

    return grpData;
  };
  const updateUser = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("userdatatoken"),
    };

    const uniqueId = id;

    const payLoad = {
      fname: firstNameData,
      lname: lastNameData,
      mobile: phoneNumberData,
      location: branchData,
      group: groupData,
      email: emailData,
    };
    const response = await fetch(url + uniqueId, {
      method: "PUT",
      headers,
      body: JSON.stringify(payLoad),
    });
    console.log(response);

    if (response.status === 200) {
      employeeData("https://mernauth-stpy.onrender.com/employee");
      onClose();
      console.log("success");
    } else {
      console.log("error on editing user");
    }
  };

  // let numberOfGroups = group;

  // let noOfGroups = numberOfGroups[0].split(",");
  // console.log(noOfGroups);
  // console.log(numberOfGroups);

  // let groupSplit = group.split(",");
  // console.log(groupSplit);
  // const checkData = (e) => {
  //   for(let i=0; i < noOfGroups.length; i++){
  //     let item = noOfGroups[i];
  //     let found = false;
  //     console.log(item,"dummy")

  //     for(let j=0; j < groupData.length; j++){
  //       let item2 = groupData[j];
  //       let item3 = item2.groupName;

  //       if(item === item3){
  //         console.log(item3, "dummy2");
  //         found = true;
  //         console.log(e.target.id);
  //         break
  //       }
  //       console.log(found,"out");
  //       // if(found){
  //       //   console.log(found,"in");

  //       // }

  //     }

  //   }
  // }

  useEffect(() => {
    getGroupData("https://mernauth-stpy.onrender.com/group");
  }, []);

  // console.log(noOfGroups);
  // console.log(groupData);

  const getId = (e) => {
    console.log(e.target.id);
  };

  const emailValidate = (e) => {
    if (!emailRegex.test(email) || e.target.value === "") {
      document.getElementById("user-email").classList.add("error-input");
    } else {
      document.getElementById("user-email").classList.remove("error-input");
    }
  };

  const nameValidate = (e) => {
    if (!nameRegex.test(e.target.value)) {
      e.target.classList.add("error-input");
    } else {
      e.target.classList.remove("error-input");
    }
  };

  const validate = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("error-input");
    } else {
      e.target.classList.remove("error-input");
    }
  };

  const phoneValidate = (e) => {
    if (!phoneRegex.test(e.target.value)) {
      e.target.classList.add("error-input");
    } else {
      e.target.classList.remove("error-input");
    }
  };

  const disablebutton = (evt) => {
    let key = evt.key;

    if (key === "e" || key === "-" || key === "+") {
      evt.preventDefault();
    }
  };

  const editDataSubmit = async (e) => {
    e.preventDefault();

    updateUser();
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>

      <div className="edit-user-div">
        <form
          className="edit-user-form"
          method="PUT"
          autoComplete="off"
          onSubmit={editDataSubmit}
        >
          <div className="form-header">
            <Mainheading name="Edit User" className="edit-user-heading" />
            <Button
              imgSrc={closeWhite}
              className="close-form"
              imgName="close"
              onClick={onClose}
            />
          </div>
          <div className="form-group">
            <Input2
              name="First Name"
              value={firstNameData}
              onBlur={nameValidate}
              onChange={(e) => setFirstNameData(e.target.value)}
            />
            <Input2
              name="Last Name"
              value={lastNameData}
              onBlur={nameValidate}
              onChange={(e) => setLastNameData(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input2
              name="Email"
              onChange={(e) => setEmailData(e.target.value)}
              onBlur={emailValidate}
              id="user-email"
              value={emailData}
            />
            <Input2
              name="Branch"
              value={branchData}
              onBlur={validate}
              onChange={(e) => setBranchData(e.target.value)}
            />
          </div>
          <div className="form-group margin-btm-none">
            <Select name="Group" onBlur={validate} onChange={getId} />

            <Input2
              name="Phone Number"
              id="userphonenum"
              type="number"
              onBlur={phoneValidate}
              onKeyDown={disablebutton}
              value={phoneNumberData}
              onChange={(e) => setPhoneNumberData(e.target.value)}
            />
          </div>
          <div className="button-group">
            <Button
              name="Update-user"
              imgSrc={editUserImg}
              imgName="edit-user-img"
              className="edit-user-button add-btn-margin"
            />
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditUser;
