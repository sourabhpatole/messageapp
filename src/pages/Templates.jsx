import React, { useEffect, useState } from "react";
import Mainheading from "../components/Main-Heading/Main-heading";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../components/Select/Select";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Templates = ({ gid }) => {
  const [lsend, setLsend] = useState([]);
  const [dsend, setDsend] = useState([]);
  const [groupData, setGroupData] = useState([]);
  // const [groupName, setGroupName] = useState([]);
  const loginData = useContext(AuthContext);
  const [lres, setLRes] = useState([]);
  const [dres, setDres] = useState([]);
  // const [menu, setMenu] = useState("");
  const [lvegmenu, setLvegmenu] = useState("");
  const [lnonvegmenu, setLnonvegmenu] = useState("");
  const [dvegmenu, setDvegmenu] = useState("");
  const [dnonvegmenu, setDnonvegmenu] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  // console.log("Sourabhoiadjflkaj");
  // console.log(startDate);
  // console.log(startDate.toLocaleDateString());
  console.log("kjdfhkaljdlfk", loginData);

  const lfetEmployee = () => {
    setInterval(() => {
      axios
        .get("http://localhost:8009/message/lsend", {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })
        .then((res) => setLsend(res.data))
        .catch((err) => console.log(err));
    }, 5000);
  };
  const dfetEmployee = () => {
    setInterval(() => {
      axios
        .get("http://localhost:8009/message/dsend", {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })
        .then((res) => setDsend(res.data))
        .catch((err) => console.log(err));
    }, 5000);
  };
  const fetReslunch = () => {
    setInterval(() => {
      axios
        .get("http://localhost:8009/message/reclunch", {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })
        .then((res) => {
          setLRes(res.data);
        })

        .catch((err) => console.log(err));
    }, 5000);
  };
  const fetResDinner = () => {
    setInterval(() => {
      axios
        .get("http://localhost:8009/message/recdinner", {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })

        .then((res) => {
          setDres(res.data);
        })

        .catch((err) => console.log(err));
    }, 5000);
  };
  console.log(dres);
  console.log(lres);

  // const handleSelect = (date) => {
  //   let filtered = allData.filter((p) => {
  //     let pDate = new Date(res["createdAt"]);
  //     return pDate == date.selection.startDate;
  //   });
  //   setStartDate(date.selection.startDate);
  //   setRes(filtered);
  // };
  const finalFilterlunch = lres.filter((item) => {
    let date = new Date(item["createdAt"]);
    return date.toLocaleDateString() === startDate.toLocaleDateString();
  });

  const finalFilterdinner = dres.filter((item) => {
    let date = new Date(item["createdAt"]);
    return date.toLocaleDateString() === startDate.toLocaleDateString();
  });

  // console.log("souurabh", finalFilterdinner);
  // console.log("Filter", finalFilter);
  const lunchvegDataCount = finalFilterlunch.filter(
    (data) => data.foodChoice === "lunch-veg"
  ).length;
  const lunchnonVegDataCount = finalFilterlunch.filter(
    (data) => data.foodChoice === "lunch-non-veg"
  ).length;
  const dinnerVegDataCount = finalFilterdinner.filter(
    (data) => data.foodChoice === "dinner-veg"
  ).length;
  const dinnernonVegDataCount = finalFilterdinner.filter(
    (data) => data.foodChoice === "dinner-non-veg"
  ).length;
  // console.log(nonVegData);
  useEffect(() => {
    // sendMessage();
    // sendMessageByGroup();
    lfetEmployee();
    dfetEmployee();
    fetReslunch();
    // filteredData();
    fetResDinner();
    // getgroupName();
  }, []);

  const sendLunchMessage = async () => {
    const text = groupData[0];
    try {
      await fetch(
        `http://localhost:8009/lunchmessage/${text}?lvegmenu=${lvegmenu}&lnonvegmenu=${lnonvegmenu}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("userdatatoken"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const sendDinnerMessage = async () => {
    const text = groupData[0];
    await fetch(
      `http://localhost:8009/dinnermessage/${text}?dvegmenu=${dvegmenu}&dnonvegmenu=${dnonvegmenu}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userdatatoken"),
        },
      }
    );
  };
  // const filteredData = () => {
  //   // let date = new Date(msg["createdAt"]);
  //   // lres.filter((item) => {
  //   //   let date = new Date(item["createdAt"]);
  //   //   return date.toLocaleDateString() === startDate.toLocaleDateString();
  //   // });
  // };
  const handleChecked = (e) => {
    let data = e.target.checked;
    // console.log("gname", e.target.value);
    if (data === true) {
      setGroupData((prevItems) => [...prevItems, e.target.value]);
    } else {
      let index = groupData.indexOf(e.target._id);
      groupData.splice(index, 1);
    }
  };
  // let group = groupData;

  // const getgroupName = () => {
  //   axios
  //     .get("https://mernauth-stpy.onrender.com/group", {
  //       headers: { Authorization: localStorage.getItem("userdatatoken") },
  //     })
  //     .then((res) => setGroupName(res.data));
  // };

  return (
    <div className="mainContainer">
      <Mainheading name="Templates" />
      {loginData.map((user) =>
        user.isAdmin === true ? (
          <div className="topmenuItems" key={user._id}>
            <div className="topmenubar">
              <div className="">
                <Select
                  name={groupData}
                  value={groupData}
                  onChange={handleChecked}
                  data={groupData}
                />
              </div>
            </div>
            <div className="topmenubar">
              <input
                type="text"
                // value={values.lveg || values.dveg}
                onChange={(e) => {
                  setLvegmenu(e.target.value);
                  setDvegmenu(e.target.value);
                }}
                placeholder="Enter Veg menu "
              />
              <input
                type="text"
                onChange={(e) => {
                  setLnonvegmenu(e.target.value);
                  setDnonvegmenu(e.target.value);
                }}
                placeholder="Enter Non-Veg menu "
              />
              <div className="buttondiv">
                <button
                  onClick={() => sendLunchMessage(lvegmenu, lnonvegmenu)}
                  className="create-team-button"
                  type="Submit"
                >
                  For Lunch
                </button>
                <button
                  onClick={() => sendDinnerMessage(dvegmenu, dnonvegmenu)}
                  className="create-team-button"
                  type="Submit"
                >
                  For Dinner
                </button>
              </div>
            </div>

            <div className="dateCalander">
              <DatePicker
                className="datepicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )
      )}

      <div className="foodContent">
        <div className="leftSideLunch">
          <div className="topChoice">
            <h4 className="heading" style={{ fontSize: "22px" }}>
              Veg-Count:-&nbsp;
              <span style={{ color: "var(--text-color)" }}>
                {lunchvegDataCount}
              </span>
            </h4>
            <h4 className="heading" style={{ fontSize: "22px" }}>
              Non-Veg-Count:-&nbsp;
              <span style={{ color: "var(--text-color)" }}>
                {lunchnonVegDataCount}
              </span>
            </h4>
          </div>
          <div className="mContainer">
            <div className="leftContainer">
              <h2 className="heading" style={{ fontSize: "20px" }}>
                Delivered Logs for Lunch
              </h2>

              <table className=" eList">
                <tr>
                  <th>Contact</th>
                  <th>Time</th>
                </tr>
                {lsend
                  .filter((item) => {
                    let date = new Date(item["createdAt"]);
                    return (
                      date.toLocaleDateString() ===
                      startDate.toLocaleDateString()
                    );
                  })
                  .map((msg, i) => {
                    let date = new Date(msg["createdAt"]);
                    return (
                      <tr key={i}>
                        <td>{msg.mobileNo}</td>
                        <td>{date.toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
            <div className="rightContainer">
              <h2
                className="heading"
                style={{ fontSize: "20px", paddingBottom: "22px" }}
              >
                Responses Logs for Lunch
              </h2>
              <table className=" eList">
                <tr>
                  <th>Name</th>
                  <th>Food Choice</th>
                  <th>Time</th>
                </tr>
                {finalFilterlunch.map((msg, i) => {
                  let date = new Date(msg.messageDate);
                  return (
                    <tr key={i}>
                      <td>{msg.name}</td>
                      <td>{msg.foodChoice}</td>
                      <td>{date.toDateString()}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
        <div className="rightsideDinner">
          <div className="topChoice">
            <h4 className="heading" style={{ fontSize: "22px" }}>
              Dinner Veg-Count:-&nbsp;
              <span style={{ color: "var(--text-color)" }}>
                {dinnerVegDataCount}
              </span>
            </h4>
            <h4 className="heading" style={{ fontSize: "22px" }}>
              Dinner Non-Veg-Count:-&nbsp;
              <span style={{ color: "var(--text-color)" }}>
                {dinnernonVegDataCount}
              </span>
            </h4>
          </div>
          <div className="mContainer">
            <div className="leftContainer">
              <h2 className="heading" style={{ fontSize: "20px" }}>
                Delivered Logs for Dinner
              </h2>

              <table className=" eList">
                <tr>
                  <th>Contact</th>
                  <th>Time</th>
                </tr>
                {dsend
                  .filter((item) => {
                    let date = new Date(item["createdAt"]);
                    return (
                      date.toLocaleDateString() ===
                      startDate.toLocaleDateString()
                    );
                  })
                  .map((msg, i) => {
                    let date = new Date(msg["createdAt"]);
                    return (
                      <tr key={i}>
                        <td>{msg.mobileNo}</td>
                        <td>{date.toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
            <div className="rightContainer">
              <h2
                className="heading"
                style={{ fontSize: "20px", paddingBottom: "22px" }}
              >
                Responses Logs for Dinner
              </h2>
              <table className=" eList">
                <tr>
                  <th>Name</th>
                  <th>Food Choice</th>
                  <th>Time</th>
                </tr>
                {finalFilterdinner.map((msg, i) => {
                  let date = new Date(msg.messageDate);
                  return (
                    <tr key={i}>
                      <td>{msg.name}</td>
                      <td>{msg.foodChoice}</td>
                      <td>{date.toDateString()}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
