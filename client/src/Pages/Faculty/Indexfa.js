import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebarfa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Faculty from "./Faculty";

const Indexfa = () => {
  const [facultyId, setFacultyId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const UserType = "faculty";
  useEffect(() => {
    axios.get("http://localhost:8080/faculty").then((res) => {
      if (res.data.Status === "Success") {
        setFacultyId(res.data.id);
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

  console.log(department);

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
          facultyId={facultyId}
        />
        <div className="grid_right_pri">
          <Faculty
            name={name}
            facultyId={facultyId}
            email={email}
            department={department}
          />
        </div>
      </div>
    </div>
  );
};

export default Indexfa;
