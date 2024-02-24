import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

function Sidebarhod({ openSidebarToggle, OpenSidebar }) {
  const handleLinkClick = () => {
    // Call OpenSidebar when a link is clicked on small devices
    if (window.innerWidth <= 992) {
      OpenSidebar();
    }
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={logo} alt="" width={40} className="icon_header" />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="#" onClick={handleLinkClick}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/hod/inbox" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faMailBulk} className="icon" /> Inbox
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/hod/faculty" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faUser} className="icon" /> Faculty
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebarhod;
