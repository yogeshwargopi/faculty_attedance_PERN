import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Inboxhr from "../../Component/Inbox/Inboxhr";
import LeaveDetailshr from "../../Component/LeaveDetails/LeaveDetailshr";
import Myprofile from "../../Component/Myprofile/Myprofile";

const Principal = (props) => {
  const { name } = props;
  const role = "hr";

  return (
    <div className="principal">
      <div>
        <div className="user">Welcome {name}</div>
        <div className="user_college">
          (HR Team of Rajiv Gandhi College Of Engineering and Technology)
        </div>
        <div className="fa_content">
          <Routes>
            <Route path="inbox" exact element={<Inboxhr />} />
            <Route path="inbox/:leave_id" element={<LeaveDetailshr />} />
            <Route path="Myprofile/:hrId" element={<Myprofile role={role} />} />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Principal;
