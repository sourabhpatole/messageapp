import React, { useEffect, useState } from "react";
import "./styles/settings.css";
import Mainheading from "../components/Main-Heading/Main-heading";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const Settings = () => {
  let loginData = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const getUsers = () => {
    axios.get("http://localhost:8009/user").then((res) => setUser(res.data));
  };
  useEffect(() => {
    getUsers();
  }, []);

  // console.log(user);
  // console.log(loginData);
  return (
    <div className="settings-div">
      <Mainheading name="Settings" />

      <div className="profile-form">
        {loginData.reduce((user) => (
          <div className="user_details" key={user._id}>
            <h2>
              Username:-<span>{user.name}</span>
            </h2>
            <h2>
              User type:-
              {user.isAdmin === true ? (
                <span>Admin user</span>
              ) : (
                <span>Normal User</span>
              )}
            </h2>
          </div>
        ))}
      </div>
      <div className="table">
        {loginData.map((e) =>
          e.isAdmin === true ? (
            <div key={e._id}>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>is Admin</th>
                  <th>CreatedAt</th>
                </tr>
                {user.map((userData) => {
                  let date = userData.createdAt;

                  return (
                    <tr key={userData._id}>
                      <td>{userData.name}</td>
                      <td>{userData.email}</td>
                      <td>
                        {userData.isAdmin === true ? (
                          <span>Admin User</span>
                        ) : (
                          <span>Normal User</span>
                        )}
                      </td>
                      <td>{date}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <div></div>
          )
        )}
      </div>
    </div>
  );
};

export default Settings;
