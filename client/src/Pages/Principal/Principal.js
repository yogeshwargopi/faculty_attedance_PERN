import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./Principal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import FacultyDetails from "../Faculty/FacultyDetails";
import Hoddetails from "../Hod/Hoddetails";
import Hrdetails from "../Hr/Hrdetails";
import Inboxpre from "../../Component/Inbox/Inboxpre";
import Addfaculty from "../../Component/Addfaculty/Addfaculty";
import Addhr from "../../Component/Addhr/Addhr";
import Addhod from "../../Component/Addhod/Addhod";
import LeaveDetailsPri from "../../Component/LeaveDetails/LeaveDetailsPri";
import Myprofile from "../../Component/Myprofile/Myprofile";

const Principal = (props) => {
  const { name } = props;
  const role = "principal";

  const navigate = useNavigate();

  const addfaculty = () => {
    navigate("/principal/addfaculty");
  };
  const addhod = () => {
    navigate("/principal/addhod");
  };
  const addhr = () => {
    navigate("/principal/addhr");
  };

  return (
    <div className="principal">
      <div>
        <div className="user">Welcome {name}</div>
        <div className="user_college">
          (Principal of Rajiv Gandhi College Of Engineering and Technology)
        </div>
        <div className="main-cards">
          <div
            className="card"
            onClick={addfaculty}
            style={{ cursor: "pointer" }}
          >
            <div className="card-inner">
              <h3>ADD FACULTY</h3>
              <FontAwesomeIcon icon={faUser} className="card_icon" />
            </div>
          </div>
          <div className="card" onClick={addhod} style={{ cursor: "pointer" }}>
            <div className="card-inner">
              <h3>ADD HOD</h3>
              <FontAwesomeIcon icon={faUserTie} className="card_icon" />
            </div>
          </div>
          <div className="card" onClick={addhr} style={{ cursor: "pointer" }}>
            <div className="card-inner">
              <h3>ADD HR TEAM</h3>
              <FontAwesomeIcon icon={faUsers} className="card_icon" />
            </div>
          </div>
        </div>
        <div className="pri_content">
          <Routes>
            <Route path="inbox" exact element={<Inboxpre />} />
            <Route path="inbox/:leave_id" element={<LeaveDetailsPri />} />
            <Route path="faculty" element={<FacultyDetails />} />
            <Route path="hod" element={<Hoddetails />} />
            <Route path="hr" element={<Hrdetails />} />
            <Route path="addfaculty" element={<Addfaculty />} />
            <Route path="addhod" element={<Addhod />} />
            <Route path="addhr" element={<Addhr />} />
            <Route
              path="Myprofile/:principalId"
              element={<Myprofile role={role} />}
            />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Principal;
