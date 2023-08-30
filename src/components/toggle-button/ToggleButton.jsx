import React from "react";
import "./togglebutton.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const ToggleButton = ({ isActive, id, employeeData, email }) => {
  const [checked, setChecked] = useState(false);
  const { token } = useContext(AuthContext);
  // const [toggledId, setToggledId] = useState("");
  const url = `https://mernauth-stpy.onrender.com/employee/`;

  const updateActive = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const payLoad = {
      email: email,
      isActive: !checked,
    };

    const response = await fetch(url + id, {
      method: "PUT",
      headers,
      body: JSON.stringify(payLoad),
    });

    console.log(response);
    if (response.status === 200) {
      employeeData("https://mernauth-stpy.onrender.com/employee");
      // console.log(checked);
    } else {
      setChecked(false);
    }
  };

  const loadChange = () => {
    if (isActive === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  useEffect(() => {
    loadChange();
  }, []);

  const handleChange = (e) => {
    if (checked === true) {
      setChecked(false);
      updateActive(e.target.id);
      console.log("unchecked");
    } else {
      setChecked(true);
      updateActive(e.target.id);
      console.log("checked");
    }
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={checked}
        id={id}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
