import React, { useState } from "react";

import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { SideBarDataFootballer } from "./SideBarDataFootballer";
import { IconContext } from "react-icons";
import { SideBarDataTerrOwner } from "./SideBarDataTerrOwner";
import {SideBarDataAdmin} from "./SideBarDataAdmin"
import { Link ,useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../JS/Actions/UserActions";
function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => {
    setSideBar(!sideBar);
  };
  const User = useSelector((state) => state.userReducer.user);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const role = User && User.role;
  const userName = User && User.fullName;
  const nameCapitalized =
    User && userName.charAt(0).toUpperCase() + userName.slice(1);
  const Auth = isAuth && isAuth;
  return (
    <>
      <IconContext.Provider value={{ color: "#75F336" }}>
        <div className="navBar">
          {Auth ? (
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars
                onClick={showSideBar}
                style={{ marginLeft: "20px" }}
              />
            </Link>
          ) : null}

          <div className="inner-nav">
            <div className="text-aria">
            <Link to="/">
              <span style={{ color: "#fff", fontSize: "2rem" }}>Reservi</span>
              <span style={{ color: "#75F336", fontSize: "2rem" }}>
                Takwira
              </span>
              </Link>

            </div>
            {!Auth ? (
              <Link to="/loginRegister">
                <button className="logout-btn">SignIn/SignUp</button>
              </Link>
            ) : (
              <div
                className="userInfo"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "17%",
                }}
              >
                <span style={{ color: "#fff", fontSize: "1rem" }}>
                  {" "}
                  Welcome {nameCapitalized}
                </span>

                <button
                  className="logout-btn"
                  onClick={() => {
                    dispatch(logOutUser());
                    history.push("/");
                  }}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </div>
        <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="nabvar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {role === "footBaller"
              ? SideBarDataFootballer.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              :role==="terrainOwner"?  SideBarDataTerrOwner.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }): SideBarDataAdmin.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
