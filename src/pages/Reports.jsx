import React, {  useEffect, useState } from "react";
import Mainheading from "../components/Main-Heading/Main-heading";
import { PieChart, Pie,  Cell,  } from "recharts";
import axios from "axios";
import "./styles/reports.css";

import DatePicker from "react-datepicker";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#712073"];

const Reports = () => {
  const [ratingl, setRatingl] = useState([]);
  const [ratingd, setRatingd] = useState([]);

  const [startDate, setStartDate] = useState(new Date());

  // const [r1, setR1] = useState([]);
  // const [r2, setR2] = useState([]);

  const responsesL = () => {
    setInterval(() => {
      axios
        .get(`http://localhost:8009/lunchfeedback`, {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })
        .then((res) => setRatingl(res.data));
    }, 5000);
  };
  const responsesD = () => {
    setInterval(() => {
      axios
        .get(`http://localhost:8009/dinnerfeedback`, {
          headers: { Authorization: localStorage.getItem("userdatatoken") },
        })
        .then((res) => setRatingd(res.data));
    }, 5000);
  };

  useEffect(() => {
    responsesL();
    responsesD();
  }, []);
  console.log(ratingl);
  console.log(ratingd);
  // setR1(rating.filter((e) => e.rating == -1));

  const finalFeedbacklunch = ratingl.filter((item) => {
    let date = new Date(item["createdAt"]);
    return date.toLocaleDateString() === startDate.toLocaleDateString();
  });

  const finalFeedbackdinner = ratingd.filter((item) => {
    let date = new Date(item["createdAt"]);
    return date.toLocaleDateString() === startDate.toLocaleDateString();
  });
  console.log("sourabh1", finalFeedbacklunch);
  console.log("sourabh2", finalFeedbackdinner);
  const handleClicklunch = async () => {
    await fetch(`http://localhost:8009/lunchfeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userdatatoken"),
      },
    });
  };
  const handleClickdinner = async () => {
    await fetch(`http://localhost:8009/dinnerfeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userdatatoken"),
      },
    });
  };
  let r1 = finalFeedbacklunch.filter((e) => e.rating === 1);
  let r2 = finalFeedbacklunch.filter((e) => e.rating === 2);
  let r3 = finalFeedbacklunch.filter((e) => e.rating === 3);
  let r4 = finalFeedbacklunch.filter((e) => e.rating === 4);
  let r5 = finalFeedbacklunch.filter((e) => e.rating === 5);
  let r6 = finalFeedbackdinner.filter((e) => e.rating === 1);
  let r7 = finalFeedbackdinner.filter((e) => e.rating === 2);
  let r8 = finalFeedbackdinner.filter((e) => e.rating === 3);
  let r9 = finalFeedbackdinner.filter((e) => e.rating === 4);
  let r0 = finalFeedbackdinner.filter((e) => e.rating === 5);
  console.log("souefaiosdjfkla", r1);
  const data1 = [
    { name: "Group A", value: r1.length },
    { name: "Group B", value: r2.length },
    { name: "Group C", value: r3.length },
    { name: "Group D", value: r4.length },
    { name: "Group E", value: r5.length },
  ];
  const data2 = [
    { name: "Group A", value: r6.length },
    { name: "Group B", value: r7.length },
    { name: "Group C", value: r8.length },
    { name: "Group D", value: r9.length },
    { name: "Group E", value: r0.length },
  ];
  return (
    <div className="reports">
      <Mainheading name="Reports" />

      <div className="fbutton">
        <div className="bleft">
          <button
            onClick={handleClicklunch}
            className="create-team-button"
            type="Submit"
          >
            Send Feedback for Lunch
          </button>
          <button
            onClick={handleClickdinner}
            className="create-team-button"
            type="Submit"
          >
            Send Feedback for Dinner
          </button>
        </div>
        <div className="bright">
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className="chartDetails">
        {(finalFeedbackdinner || finalFeedbacklunch).length === 0 ? (
          <div className="nodata">
            <h1>No Data found</h1>
          </div>
        ) : (
          <div className="piechart">
            <div className="p1">
              <PieChart width={900} height={400}>
                <Pie
                  data={data1}
                  cx={220}
                  cy={200}
                  innerRadius={90}
                  outerRadius={150}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="reportDetails">
                <form action="" className="profile-form">
                  <div className="meal-checkbox-div">
                    <h1 className="headline">Responses for lunch</h1>
                    <div className="breakfast-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#0088FE" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Very Unsatisfied <span>{r1.length}</span>
                      </span>
                    </div>
                    <div className="lunch-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#00C49F" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Unsatisfied <span>{r2.length}</span>
                      </span>
                    </div>
                    <div className="dinner-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#FFBB28" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Neutral <span>{r3.length}</span>
                      </span>
                    </div>
                    <div className="breakfast-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#FF8042" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Satisfied <span>{r4.length}</span>
                      </span>
                    </div>
                    <div className="lunch-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#712073" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Very Satisfied <span>{r5.length}</span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="p2">
              <PieChart width={1080} height={400}>
                <Pie
                  data={data2}
                  cx={220}
                  cy={200}
                  innerRadius={90}
                  outerRadius={150}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="reportDetails">
                <form action="" className="profile-form">
                  <div className="meal-checkbox-div">
                    <h1 className="headline">Responses for Dinner</h1>
                    <div className="breakfast-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#0088FE" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Very Unsatisfied <span>{r6.length}</span>
                      </span>
                    </div>
                    <div className="lunch-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#00C49F" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Unsatisfied <span>{r7.length}</span>
                      </span>
                    </div>
                    <div className="dinner-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#FFBB28" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Neutral <span>{r8.length}</span>
                      </span>
                    </div>
                    <div className="breakfast-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#FF8042" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Satisfied <span>{r9.length}</span>
                      </span>
                    </div>
                    <div className="lunch-div">
                      <label class="cb-container">
                        <input type="checkbox" />
                        <svg
                          viewBox="0 0 64 64"
                          height="24px"
                          width="24px"
                          style={{ backgroundColor: "#712073" }}
                        >
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            class="path"
                          ></path>
                        </svg>
                      </label>
                      <span className="meal-text">
                        Very Satisfied <span>{r0.length}</span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
