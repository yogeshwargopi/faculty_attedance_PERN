import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FaUserGraduate } from "react-icons/fa";
import "./Navbar.css";
import { useMediaQuery, useTheme } from "@mui/material";
import DrawerComp from "../../Pages/LoginPage/Drawer";
import logo from "../../Assets/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="img" className="login-logo" />
        </div>
        <div className="nav-elements">
          {isMatch ? (
            <div>
              <DrawerComp />
            </div>
          ) : (
            <ul>
              <li>
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHome} className="nav_icon" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login/faculty">
                  <FontAwesomeIcon icon={faUser} className="nav_icon" />
                  Faculty
                </NavLink>
              </li>
              <li>
                <NavLink to="/login/hod">
                  <FontAwesomeIcon icon={faUserTie} className="nav_icon" />
                  HOD
                </NavLink>
              </li>
              <li>
                <NavLink to="/login/principal">
                  <FaUserGraduate className="nav_icon" />
                  Principal
                </NavLink>
              </li>
              <li>
                <NavLink to="/login/hr">
                  <FontAwesomeIcon icon={faUsers} className="nav_icon" />
                  HR Team
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
