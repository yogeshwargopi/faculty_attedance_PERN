import React, { useState } from "react";
import { ImagetoBase64 } from "../../Utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [Principal, setPrincipal] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setPrincipal((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const imagebase64 = await ImagetoBase64(e.target.files[0]);
    // console.log(data)

    setPrincipal((preve) => {
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
      const response = await fetch("http://localhost:8080/signup/principal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Principal),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log(data);

      // Display a success message to the user
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className=""
          onChange={handleOnChange}
          value={Principal.name}
        />

        <label htmlFor="email">Email</label>
        <input
          type={"email"}
          name="email"
          className=""
          onChange={handleOnChange}
          value={Principal.email}
        />

        <label htmlFor="password">Password</label>
        <input
          type={"password"}
          name="password"
          className=""
          onChange={handleOnChange}
          value={Principal.password}
        />

        <label htmlFor="">Phone:</label>
        <input
          type={"number"}
          name="phone"
          className=""
          onChange={handleOnChange}
          value={Principal.phone}
        />

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

        <button className="">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
