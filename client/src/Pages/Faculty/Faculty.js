import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./Faculty.css";
import Compose from "../../Component/Compose/Compose";
import Sent from "../../Component/Compose/Sent";
import SentDetails from "../../Component/LeaveDetails/SentDetails";
import Myprofile from "../../Component/Myprofile/Myprofile";

const Faculty = (props) => {
  const { name, facultyId, email, department } = props;
  const role = "faculty";
  return (
    <div className="principal">
      <div>
        <div className="user">Welcome {name}</div>
        <div className="user_college">
          (Faculty of Rajiv Gandhi College Of Engineering and Technology)
        </div>
        <div className="fa_content">
          <Routes>
            <Route path="sent" element={<Sent facultyId={facultyId} />} />
            <Route path="sent/:leave_id" element={<SentDetails />} />
            <Route
              path="Myprofile/:facultyId"
              element={<Myprofile role={role} />}
            />
            <Route
              path="compose"
              element={
                <Compose
                  name={name}
                  facultyId={facultyId}
                  email={email}
                  department={department}
                />
              }
            />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
