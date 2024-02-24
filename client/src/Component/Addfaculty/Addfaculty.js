import React, { useState } from "react";
import { ImagetoBase64 } from "../../Utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import "./Add.css";

const Addfaculty = () => {
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    phone: "",
    department: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFaculty((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const imagebase64 = await ImagetoBase64(e.target.files[0]);
    // console.log(data)

    setFaculty((preve) => {
      return {
        ...preve,
        image: imagebase64,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform form submission logic (e.g., send data to the server)
      const response = await fetch("http://localhost:8080/addfaculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faculty),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log(data);

      setFaculty({
        name: "",
        email: "",
        password: "",
        image: "",
        phone: "",
        department: "",
      });

      // Display a success message to the user
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      toast.error("Failed to submit the form");
    }
  };
  return (
    <div className="add">
      <form className="" onSubmit={handleSubmit}>
        <h2>Add Faculty</h2>
        <div className="div_add">
          <label htmlFor="name">Name:</label>
          <br></br>
          <input
            type={"text"}
            name="name"
            className=""
            onChange={handleOnChange}
            value={faculty.name}
          />
        </div>
        <div className="div_add">
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            type={"email"}
            name="email"
            className=""
            onChange={handleOnChange}
            value={faculty.email}
          />
        </div>
        <div className="div_add">
          <label htmlFor="password">Password:</label>
          <br></br>
          <input
            type={"password"}
            name="password"
            className=""
            onChange={handleOnChange}
            value={faculty.password}
          />
        </div>
        <div className="div_add">
          <label htmlFor="">Phone:</label>
          <br></br>
          <input
            type={"number"}
            name="phone"
            className=""
            onChange={handleOnChange}
            value={faculty.phone}
          />
        </div>
        <div className="div_add">
          <label>Department:</label>
          <br></br>
          <select
            name="department"
            value={faculty.department}
            onChange={handleOnChange}
            required
          >
            <option value="">Select Department</option>
            <option value="FYE">FYE</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            {/* Add other departments */}
          </select>
        </div>
        <div className="div_add">
          <label htmlFor="image">
            Image
            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className=""
            />
          </label>
        </div>
        <div className="div_add_btn">
          <button className="">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Addfaculty;
