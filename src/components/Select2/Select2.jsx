import React from "react";
import "./select2.css";
import { useState } from "react";
// import { AuthContext } from "../../AuthContext";
import dropdownArrow from "../Select/images/dropdownArrow.png";

const Select2 = ({ name, onChange, extraClass }) => {
  const [toggle, setToggle] = useState(false);

  //

  const toggleCb = () => {
    setToggle(!toggle);
  };

  return (
    <div className="">
      <div
        className={`select-btn-2 ${toggle ? "open" : ""}`}
        onFocus={toggleCb}
        onClick={toggleCb}
      >
        <span className="btn-text">{name}</span>
        <span className="arrow-dwn">
          <img
            src={dropdownArrow}
            alt="dropdown-arrow"
            className="dropdown-arrow"
          />
        </span>
      </div>
      <ul className={`list-items ${extraClass}`}>
        <li className="select-li">
          <span className="checkbox">
            <div className="select-div">
              <label className="cb-container">
                <input type="checkbox" id="breakfast" onChange={onChange} />
                <svg viewBox="0 0 64 64" height="24px" width="24px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  ></path>
                </svg>
              </label>
              <span className="select-text">Breakfast</span>
            </div>
          </span>
        </li>

        <li className="select-li">
          <span className="checkbox">
            <div className="select-div">
              <label className="cb-container">
                <input type="checkbox" id="lunch" onChange={onChange} />
                <svg viewBox="0 0 64 64" height="24px" width="24px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  ></path>
                </svg>
              </label>
              <span className="select-text">Lunch</span>
            </div>
          </span>
        </li>

        <li className="select-li">
          <span className="checkbox">
            <div className="select-div">
              <label className="cb-container">
                <input type="checkbox" id="dinner" onChange={onChange} />
                <svg viewBox="0 0 64 64" height="24px" width="24px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  ></path>
                </svg>
              </label>
              <span className="select-text">Dinner</span>
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Select2;
