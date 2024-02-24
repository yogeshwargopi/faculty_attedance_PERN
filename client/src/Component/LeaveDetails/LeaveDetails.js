import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const LeaveDetails = () => {
  const [leave, setLeave] = useState(null);
  const { leave_id } = useParams();

  useEffect(() => {
    // Fetch user details by user ID from your API or data source
    // Replace this with your actual API endpoint
    axios
      .get(`http://localhost:8080/inbox/${leave_id}`)
      .then((response) => {
        setLeave(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
      });
  }, [leave_id]);

  const handleHODApproval = async () => {
    try {
      await axios.put(`http://localhost:8080/hod/approve/${leave_id}`);
      // Refresh leave details or update state accordingly
      axios
        .get(`http://localhost:8080/inbox/${leave_id}`)
        .then((response) => {
          setLeave(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle the error, e.g., display an error message to the user
        });
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleHODRejection = async () => {
    try {
      await axios.put(`http://localhost:8080/hod/reject/${leave_id}`);
      // Refresh leave details or update state accordingly
      axios
        .get(`http://localhost:8080/inbox/${leave_id}`)
        .then((response) => {
          setLeave(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle the error, e.g., display an error message to the user
        });
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  const handleBack = () => {
    // Use history to go back to the previous page
    window.history.back();
  };

  return (
    <div>
      <div className="">
        <h1>User Details</h1>
        <FaArrowLeft onClick={handleBack} />
        {leave ? (
          <div className="">
            <p>Name: {leave.name}</p>
            <p>Email: {leave.email}</p>
            <p>Designation: {leave.designation}</p>
            <p>Leave Type: {leave.leave_type}</p>
            <p>Start Date: {leave.leave_start_date}</p>
            <p>Start Time: {leave.leave_start_time}</p>
            <p>End Date: {leave.leave_end_date}</p>
            <p>End Time: {leave.leave_end_time}</p>
            <p>Purpose: {leave.purpose}</p>
            <p>HOD Approval Status: {leave.hod_approval_status}</p>

            {/* Buttons for HOD actions */}
            {leave.hod_approval_status === "PENDING" && (
              <>
                <button onClick={handleHODApproval}>Approve</button>
                <button onClick={handleHODRejection}>Reject</button>
              </>
            )}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default LeaveDetails;
