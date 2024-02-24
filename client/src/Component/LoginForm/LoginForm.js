import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = ({ userType, onLogin }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser((preuser) => ({
      ...preuser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (userType === "Principal") {
        axios
          .post("http://localhost:8080/login/principal", user)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "Success") {
              localStorage.setItem("token", res.data.token);
              navigate("/principal/inbox");
              toast("login successfull");
            } else {
              toast(res.data.Error);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            alert("An error occurred during login. Please try again later.");
          });
      } else if (userType === "Faculty") {
        axios
          .post("http://localhost:8080/login/faculty", user)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "Success") {
              localStorage.setItem("token", res.data.token);
              navigate("/faculty/sent");
              toast("login successfull");
            } else {
              toast(res.data.Error);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            alert("An error occurred during login. Please try again later.");
          });
      } else if (userType === "HR") {
        axios
          .post("http://localhost:8080/login/hr", user)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "Success") {
              localStorage.setItem("token", res.data.token);
              navigate("/hr/inbox");
              toast("login successfull");
            } else {
              toast(res.data.Error);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            alert("An error occurred during login. Please try again later.");
          });
      } else if (userType === "HOD") {
        axios
          .post("http://localhost:8080/login/hod", user)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "Success") {
              localStorage.setItem("token", res.data.token);
              navigate("/hod/inbox");
              toast("login successfull");
            } else {
              toast(res.data.Error);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            alert("An error occurred during login. Please try again later.");
          });
      }

      // You can redirect or perform other actions after successful login
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      toast.error("Login failed");
    }
  };

  return (
    <div className="login_form">
      <h2>{userType} Login</h2>
      <form className="" onSubmit={handleLogin}>
        <div className="user_form">
          <input
            type="email"
            name="email"
            className=""
            onChange={handleOnChange}
            value={user.email}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="user_form">
          <input
            type="password"
            name="password"
            className=""
            onChange={handleOnChange}
            value={user.password}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="login_btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
