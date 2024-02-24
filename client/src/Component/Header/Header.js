import React, { useState } from "react";
import { BsPersonCircle, BsJustify } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const {
    OpenSidebar,
    name,
    image,
    UserType,
    facultyId,
    hodId,
    principalId,
    hrId,
  } = props;

  console.log(UserType);

  const handleButton = () => {
    setShowDropdown(!showDropdown);
    if (UserType === "faculty") {
      console.log(UserType);
      navigate(`Myprofile/${facultyId}`);
    } else if (UserType === "hod") {
      console.log(UserType);
      navigate(`Myprofile/${hodId}`);
    } else if (UserType === "principal") {
      console.log(UserType);
      navigate(`Myprofile/${principalId}`);
    } else if (UserType === "hr") {
      console.log(UserType);
      navigate(`Myprofile/${hrId}`);
    }
  };

  const handleLogout = () => {
    setShowDropdown(!showDropdown);
    // Implement your logout logic here
    navigate("/");
    toast("Logged out successfully");
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div
        className="header-left"
        style={{ fontWeight: "600", fontSize: "18px" }}
      >
        Leave Application Form
      </div>
      <div className="header-right">
        <div
          className="user-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {image ? (
            <img
              src={image}
              id="userImage"
              alt="User Image"
              className="header-image"
              width={25}
              height={25}
              style={{
                borderRadius: "9999px",
                marginTop: "5px",
                marginRight: "8px",
              }}
            />
          ) : (
            <BsPersonCircle className="icon" />
          )}
          <p style={{ fontSize: "16px", textTransform: "capitalize" }}>
            {name}
          </p>
        </div>
        {showDropdown && (
          <div className="dropdown">
            <button onClick={handleButton}>My Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
