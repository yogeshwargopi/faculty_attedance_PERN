import React, { useEffect, useState } from "react";
import "./Indexpre.css";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/SidebarPri";
import Principal from "./Principal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Indexpre() {
  const [principalId, setPrincipalId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const UserType = "principal";
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/principal").then((res) => {
      if (res.data.Status === "Success") {
        setPrincipalId(res.data.id);
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
          principalId={principalId}
        />
        <div className="grid_right_pri">
          <Principal name={name} />
        </div>
      </div>
    </div>
  );
}

export default Indexpre;
