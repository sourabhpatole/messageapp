import React from "react";
import ReactDom from "react-dom";
import Input2 from "../components/Input2/Input2";
import Button from "../components/Button";
import { useState } from "react";
import createTeam from "./images/create-team-white.png";
import closeWhite from "./images/close-white.png";
import Mainheading from "../components/Main-Heading/Main-heading";

const CreateTeam = ({ open, onClose }) => {
  const [createdBy, setCreatedBy] = useState("");
  const [groupName, setGroupName] = useState("");
  const nameRegex = /^[A-Za-z]+$/;

  const validate = (e) => {
    if (!nameRegex.test(e.target.value)) {
      e.target.classList.add("error-input");
    } else {
      e.target.classList.remove("error-input");
    }
  };

  const userTeamSubmit = async (e) => {
    e.preventDefault();
    const newTeam = { groupName, createdBy };

    const newTeamData = await fetch(
      "https://mernauth-stpy.onrender.com/group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userdatatoken"),
        },
        body: JSON.stringify(newTeam),
      }
    );

    console.log("Submitted");
    console.log(newTeamData.status);

    if (newTeamData.status === 200) {
      onClose();
      //   isSubmit();
    }
    e.target.reset();
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="create-team-div">
        <form
          className="create-team-form"
          method="POST"
          autoComplete="off"
          onSubmit={userTeamSubmit}
        >
          <div className="form-header">
            <Mainheading name="Create Group" className="create-team-heading" />
            <Button
              imgSrc={closeWhite}
              className="close-form"
              imgName="close"
              onClick={onClose}
            />
          </div>
          <div className="form-group">
            <Input2
              name="Created By"
              value={createdBy}
              onBlur={validate}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
            <Input2
              name="Group Name"
              value={groupName}
              onBlur={validate}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="button-group">
            <Button
              name="Add-Team"
              imgSrc={createTeam}
              imgName="create-team-img"
              className="create-team-button add-btn-margin"
            />
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreateTeam;
