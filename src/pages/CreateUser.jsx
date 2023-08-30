import React from "react";
import Input2 from "../components/Input2/Input2";
import createUser from "./images/create-user-white.png";
import Button from "../components/Button";
import { useState } from "react";
import "./styles/settings.css";
import closeWhite from "./images/close-white.png";
import Mainheading from "../components/Main-Heading/Main-heading";
import ReactDom from "react-dom";
import Select from "../components/Select/Select";

const CreateUser = ({ open, isSubmit, onClose }) => {
  const [email, setEmail] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [location, setLocation] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [mobile, setMobile] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\+?[0-9]{10}$/;
  let finalGroups = null;

  // const { token } = useContext(AuthContext);
  // const [groupData, setGroupData] = useState("");

  console.log(groupData);

  // const getGroupData = async (url) => {
  //   const headers = {
  //     Authorization: token,
  //   };

  //   const grpFetch = await fetch(url, {
  //     method: "GET",
  //     headers,
  //   });

  //   const grpData = await grpFetch.json();
  //   setGroupData(grpData);

  //   // console.log(grpData);

  //   return grpData;
  // }

  // useEffect(() => {
  //   getGroupData("https://mernauth-stpy.onrender.com/group");
  //   console.log(groupData);
  // }, []);

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
  const handleChecked = (e) => {
    let data = e.target.checked;
    // console.log("gname", e.target.value);
    if (data === true) {
      setGroupData((prevItems) => [...prevItems, e.target.value]);
      // console.log("groupData", groupData);
    } else {
      let index = groupData.indexOf(e.target._id);
      groupData.splice(index, 1);
    }
  };

  const userDataSubmit = async (e) => {
    e.preventDefault();

    // let groupName = groupData.join();
    // console.log(groupName);
    let group = groupData;

    console.log("group", group);

    const newUser = { fname, lname, location, email, group, mobile };

    console.log(newUser);

    const newUserData = await fetch(
      "https://mernauth-stpy.onrender.com/employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userdatatoken"),
        },
        body: JSON.stringify(newUser),
      }
    );

    console.log(JSON.stringify(newUser));
    console.log("Submitted");
    console.log(newUserData.status);
    console.log(finalGroups);

    if (newUserData.status === 200) {
      onClose();
      isSubmit();
      setEmail("");
      setGroupData("");
      setLocation("");
      setMobile("");
      setfname("");
      setlname("");
    }
  };

  // console.log("groupdata ", groupData);

  // setGroup(finalGroups);

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="create-user-div">
        <form
          className="create-user-form"
          method="POST"
          autoComplete="off"
          onSubmit={userDataSubmit}
        >
          <div className="form-header">
            <Mainheading name="Create User" className="create-user-heading" />
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
              value={fname}
              onBlur={nameValidate}
              onChange={(e) => setfname(e.target.value)}
            />
            <Input2
              name="Last Name"
              value={lname}
              onBlur={nameValidate}
              onChange={(e) => setlname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input2
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={emailValidate}
              id="user-email"
              value={email}
            />
            <Input2
              name="Branch"
              value={location}
              onBlur={validate}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group margin-btm-none">
            <Select
              name="Group"
              value={groupData}
              onChange={handleChecked}
              data={groupData}
            />

            <Input2
              name="Phone Number"
              id="userphonenum"
              type="number"
              onBlur={phoneValidate}
              onKeyDown={disablebutton}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {/* <Input2
              name="Group"
              value={group}
              onBlur={validate}
              onChange={(e) => setGroup(e.target.value)}
            /> */}
          </div>
          <div className="button-group">
            <Button
              name="Add-user"
              imgSrc={createUser}
              imgName="create-user-img"
              className="create-user-button add-btn-margin"
            />
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreateUser;
