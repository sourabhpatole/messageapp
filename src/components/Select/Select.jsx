import React from "react";
import "./select.css";
import { useState, useEffect } from "react";
import dropdownArrow from "./images/dropdownArrow.png";
import axios from "axios";

const Select = ({ name, onChange, onNumber, extraClass }) => {
  const [groupData, setGroupData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getGroupData = () => {
    axios
      .get("http://localhost:8009/group", {
        headers: { Authorization: localStorage.getItem("userdatatoken") },
      })
      .then((response) => setGroupData(response.data));
  };
  // console.log("groupData", groupData);

  useEffect(() => {
    getGroupData();
  }, []);

  const toggleCb = () => {
    setToggle(!toggle);
  };
  // const defaultCheckedItems = (e) => {
  //   for (let i = 0; i < onNumber.length; i++) {
  //     let item = onNumber[i];
  //     if (item === e.target.id) {
  //       console.log(e.target.id, "id");
  //       console.log(item, "id");
  //     }
  //   }
  // };

  // console.log("sourabh", groupData);
  // console.log("lname", name.toString());
  const filterdataa = groupData.filter((e) => e._id === name.toString());

  return (
    <div className="">
      <div
        className={`select-btn ${toggle ? "open" : ""}`}
        onBlur={toggleCb}
        onClick={toggleCb}
      >
        {filterdataa.map((e) => (
          <span className="btn-text" key={e._id}>
            {e.groupName}
          </span>
        ))}
        <span className="arrow-dwn">
          <img
            src={dropdownArrow}
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </span>
      </div>
      <ul className={`list-items ${extraClass}`}>
        {groupData.map((item, index) => (
          <li className="select-li" key={item._id}>
            <span className="checkbox">
              <div className="select-div">
                <label className="cb-container">
                  <input
                    type="checkbox"
                    id={item._id}
                    value={item._id}
                    onChange={onChange}
                    placeholder="Select groupname"
                    // onLoad={defaultCheckedItems}
                  />
                  <svg viewBox="0 0 64 64" height="20px" width="20px">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    ></path>
                  </svg>
                </label>
                <span className="select-text">{item.groupName}</span>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
