import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidehod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Hod from "./hod";

const Indexho = () => {
  const [hodId, setHodId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [department, setDepartment] = React.useState("");
  const UserType = "hod";
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/hod").then((res) => {
      if (res.data.Status === "Success") {
        setHodId(res.data.id);
        setName(res.data.name);
        setImage(res.data.image);
        setEmail(res.data.email);
        setDepartment(res.data.department);
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
          hodId={hodId}
        />
        <div className="grid_right_pri">
          <Hod name={name} department={department} />
        </div>
      </div>
    </div>
  );
};

export default Indexho;
