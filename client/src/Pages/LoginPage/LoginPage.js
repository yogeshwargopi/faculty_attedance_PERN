import React from "react";
import LoginForm from "../../Component/LoginForm/LoginForm";
import Navbar from "../../Component/Navbar/Navbar";
import "./LoginPage.css";

const LoginPage = ({ userType }) => {
  const handleLogin = (credentials) => {
    // Perform API call to login endpoint based on user type
    // Use credentials.username, credentials.password, and credentials.userType
    console.log(`Logging in as ${credentials.userType}`, credentials);
    // Implement API call here
  };

  return (
    <div>
      <div className="navbar_tab">
        <Navbar />
      </div>
      <div className="home_top">
        <div className="home_top_body">
          <img className="home_img" />
          <div className="image_cover" />
          <div className="home_college">
            <div className="home_college_box">
              <p id="onehome">
                RAJIV GANDHI COLLEGE OF ENGINEERING AND TECHNOLOGY
              </p>
              <p id="twohome">
                Approved by AICTE and Affiliated to Pondicherry University
              </p>
            </div>
          </div>
          <div className="login_title">
            <LoginForm userType={userType} onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
