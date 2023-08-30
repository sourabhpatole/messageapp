import React from "react";
import closeWhite from "../../pages/images/close-white.png";
import Button from "../Button";
import ReactDom from "react-dom";
import deleteImg from "../employee-card/images/delete.png";
import Mainheading from "../Main-Heading/Main-heading";
import "./deleteuser.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const DeleteUser = ({ open, onClose, employeeData, id, email, active }) => {
  const { token } = useContext(AuthContext);
  const url = `https://mernauth-stpy.onrender.com/employee/`;

  const deleteUserData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const uniqueId = id;

    const payLoad = {
      email: email,
      isActive: active,
    };

    const response = await fetch(url + uniqueId, {
      method: "PUT",
      headers,
      body: JSON.stringify(payLoad),
    });
    console.log(response);

    if (response.status === 200) {
      employeeData("https://mernauth-stpy.onrender.com/employee");
      // sessionStorage.setItem('addTime',true);
      onClose();
      console.log("success");
    } else {
      console.log("error on editing user");
    }
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="delete-user-div">
        <div className="delete-div">
          <div className="form-header">
            <Mainheading name="Delete User" className="delete-user-heading" />
            <Button
              imgSrc={closeWhite}
              className="close-form"
              imgName="close"
              onClick={onClose}
            />
          </div>
          <div className="delete-msg">Are you sure you want to delete ?</div>
          <div className="buttons-div">
            <Button
              name="Confirm"
              imgSrc={deleteImg}
              imgName="delete-user-img"
              className="delete-user-button add-btn-margin"
              onClick={deleteUserData}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteUser;
