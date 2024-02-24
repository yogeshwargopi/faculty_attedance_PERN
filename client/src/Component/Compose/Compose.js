import React, { useState } from "react";
import "./Compose.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Compose = (props) => {
  const { name, facultyId, email, department } = props;
  const [formData, setFormData] = useState({
    faculty_id: facultyId || null,
    email: email,
    name: name,
    designation: "",
    department: department,
    leaveType: "",
    leaveStartDate: "",
    leaveStartTime: "",
    leaveEndDate: "",
    leaveEndTime: "",
    purpose: "",
    attachment: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      attachment: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Send the form data to the server or perform other actions
    try {
      // Perform form submission logic (e.g., send data to the server)
      const response = await fetch("http://localhost:8080/leave-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to apply");
      }

      const data = await response.json();
      console.log(data);
      setFormData({
        designation: "",
        leaveType: "",
        leaveStartDate: "",
        leaveStartTime: "",
        leaveEndDate: "",
        leaveEndTime: "",
        purpose: "",
        attachment: null,
      });

      navigate("/faculty/sent");
      // Display a success message to the user
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className="compose">
      <h2>Leave Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} disabled />
        </div>
        <div>
          <label>Your Name:</label>
          <input type="text" name="name" value={name} disabled />
        </div>
        <div>
          <label>Your Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Your Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            <option value={department}>{department}</option>

            {/* Add other departments */}
          </select>
        </div>
        <div>
          <label>Type of Leave:</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            {/* Add other leave types */}
          </select>
        </div>
        <div>
          <label>Leave Start Date:</label>
          <input
            type="date"
            name="leaveStartDate"
            value={formData.leaveStartDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Leave Start Time:</label>
          <input
            type="time"
            name="leaveStartTime"
            value={formData.leaveStartTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Leave End Date:</label>
          <input
            type="date"
            name="leaveEndDate"
            value={formData.leaveEndDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Leave End Time:</label>
          <input
            type="time"
            name="leaveEndTime"
            value={formData.leaveEndTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Purpose of Leave:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Attach documents if any</label>
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            required
          />
        </div>
        <div className="button_com">
          <button type="submit">Apply</button>
        </div>
      </form>
    </div>
  );
};

export default Compose;
