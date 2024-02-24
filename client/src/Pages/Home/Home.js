import React from "react";
import bg from "../../Assets/bg.png";
import "./Home.css";
import Navbar from "../../Component/Navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
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
          <div className="home_title">
            <p>LEAVE APPLICTION FORM FOR FACULTY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
