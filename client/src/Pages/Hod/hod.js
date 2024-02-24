import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Addfaculty from "../../Component/Addfaculty/Addfaculty";
import FacultyDetails from "../Faculty/FacultyDetails";
import Inboxhod from "../../Component/Inbox/Inboxhod";
import LeaveDetails from "../../Component/LeaveDetails/LeaveDetails";
import Myprofile from "../../Component/Myprofile/Myprofile";

const Hod = (props) => {
  const { name, department } = props;
  const role = "hod";
  const navigate = useNavigate();

  const addfaculty = () => {
    navigate("/hod/addfaculty");
  };

  return (
    <div className="principal">
      <div>
        <div className="user">Welcome {name}</div>
        <div className="user_college">
          (HOD of Rajiv Gandhi College Of Engineering and Technology)
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
        </div>
        <div className="pri_content">
          <Routes>
            <Route
              path="inbox"
              exact
              element={<Inboxhod department={department} />}
            />
            <Route path="inbox/:leave_id" element={<LeaveDetails />} />
            <Route path="faculty" element={<FacultyDetails />} />
            <Route path="addfaculty" element={<Addfaculty />} />
            <Route
              path="Myprofile/:hodId"
              element={<Myprofile role={role} />}
            />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Hod;
