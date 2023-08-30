import "./sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import dashboardImg from "./sidebar-images/dashboard.png";
import reportsImg from "./sidebar-images/reports.png";
import usersImg from "./sidebar-images/users.png";
import dashboardImgWhite from "./sidebar-images/dashboard-white.png";
import reportsImgWhite from "./sidebar-images/reports-white.png";
import usersImgWhite from "./sidebar-images/users-white.png";
import settingImg from "./sidebar-images/setting.png";
import settingImgWhite from "./sidebar-images/setting-white.png";
import logoutImg from "./sidebar-images/logout.png";
import logoutImgWhite from "./sidebar-images/logout-white.png";
import { useNavigate } from "react-router-dom";
import messageImg from "./sidebar-images/message.png";
import messageImgWhite from "./sidebar-images/message-white.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarMenu = [
    {
      path: "main/dashboard",
      name: "Dashboard",
      iconSrc: dashboardImg,
      iconHover: dashboardImgWhite,
    },
    {
      path: "main/templates",
      name: "Message Center",
      iconSrc: messageImg,
      iconHover: messageImgWhite,
    },
    {
      path: "main/reports",
      name: "Reports",
      iconSrc: reportsImg,
      iconHover: reportsImgWhite,
    },
    {
      path: "main/users",
      name: "Users",
      iconSrc: usersImg,
      iconHover: usersImgWhite,
    },
  ];

  // const profileMenu =[
  //     {
  //         path : 'main/settings',
  //         name : 'Settings',
  //         iconSrc : settingImg,
  //         iconHover : settingImgWhite
  //     },
  //     {
  //         path : '/',
  //         name : 'Logout',
  //         iconSrc : logoutImg,
  //         iconHover: logoutImgWhite
  //     }
  // ]

  const [active, setActive] = useState("Dashboard");

  const defaultActive = (e) => {
    setActive(e);
  };

  const logoutActive = (e) => {
    setActive(e);
    localStorage.removeItem("userdatatoken");
  };

  const loginTime = new Date().getTime();
  // console.log(loginTime);

  let lastUsedTime = loginTime;

  let timeLimit = 600000;

  const usage = () =>
    setInterval(() => {
      let currentTime = new Date().getTime();

      // console.log(lastUsedTime);

      let timeDifference = currentTime - lastUsedTime;
      // console.log(timeDifference);

      if (timeDifference > timeLimit) {
        logoutActive();
        navigate("/");
        // console.log("time");
      }

      lastUsedTime = currentTime;
    }, 6000);

  usage();

  // const load = useEffect(()=>{
  //     navigate("/");
  // },[])

  return (
    <div className="sidebar-div">
      <div className="sidebar">
        <div className="sidebar-links">
          {sidebarMenu.map((item, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={item.path}
              key={index}
              name={item.name}
              onClick={() => defaultActive(item.name)}
              className={`nav-link ${active === item.name ? "active" : ""}`}
            >
              <div className="icon">
                <img
                  className="sidebar-img"
                  src={item.iconSrc}
                  alt={item.name}
                />
                <img
                  className="sidebar-img-white"
                  src={item.iconHover}
                  alt={item.name}
                />
              </div>
              <div className="link-name">{item.name}</div>
            </Link>
          ))}
        </div>
        <div className="profile-wrapper">
          {/* {
                            profileMenu.map((item,index)=> ( */}
          <Link
            style={{ textDecoration: "none" }}
            to="main/settings"
            key="pw-1"
            name="Settings"
            onClick={() => defaultActive("Settings")}
            className={`nav-link ${active === "Settings" ? "active" : ""}`}
          >
            <div className="icon">
              <img className="sidebar-img" src={settingImg} alt="settings" />
              <img
                className="sidebar-img-white"
                src={settingImgWhite}
                alt="settings"
              />
            </div>
            <div className="link-name">Settings</div>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="/"
            key="pw-2"
            name="Logout"
            onClick={() => logoutActive("Logout")}
            className={`nav-link ${active === "Logout" ? "active" : ""}`}
          >
            <div className="icon">
              <img className="sidebar-img" src={logoutImg} alt="Logout" />
              <img
                className="sidebar-img-white"
                src={logoutImgWhite}
                alt="Logout"
              />
            </div>
            <div className="link-name">Logout</div>
          </Link>
          {/* )
                            ) 
                        }*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
