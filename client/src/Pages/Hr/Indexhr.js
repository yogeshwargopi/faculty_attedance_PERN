import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebarhr";
import Hr from "./Hr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Indexhr() {
  const [hrId, setHrId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const UserType = "hr";
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/hr").then((res) => {
      if (res.data.Status === "Success") {
        setHrId(res.data.id);
        setName(res.data.name);
        setImage(res.data.image);
        setEmail(res.data.email);
      } else {
        navigate("/");
        toast("Please login");
      }
    });
  }, [navigate]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <div className="grid_left">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
      <div className="grid_right">
        <Header
          OpenSidebar={OpenSidebar}
          name={name}
          image={image}
          email={email}
          UserType={UserType}
          hrId={hrId}
        />
        <div className="grid_right_pri">
          <Hr />
        </div>
      </div>
    </div>
  );
}

export default Indexhr;
