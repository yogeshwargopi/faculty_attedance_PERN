import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Myprofile = (props) => {
  const [profile, setProfile] = useState(null);
  const { hodId, facultyId, principalId, hrId } = useParams();
  const { role } = props;
  let id;

  // Determine the appropriate ID based on the role
  switch (role) {
    case "faculty":
      id = facultyId;
      break;
    case "hod":
      id = hodId;
      break;
    case "principal":
      id = principalId;
      break;
    case "hr":
      id = hrId;
      break;
    default:
      id = null;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/myprofile/${role}/${id}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
      });
  }, [id, role]);

  return (
    <div>
      <p>my profile</p>
      <div>
        {profile ? (
          <div className="">
            <img
              src={profile.image}
              id="userImage"
              alt="User Image"
              width={100}
              height={100}
              style={{
                borderRadius: "9999px",
                marginTop: "5px",
                marginRight: "8px",
              }}
            />
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Designation: {role}</p>
            <p>Phone: {profile.phone_no}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Myprofile;

/*import React, { useEffect } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";

const Myprofile = (props) => {
  //let { id } = useParams();
  const { role, facultyId, hodId, principalId, hrId } = props;
  let id;

  // Determine the appropriate ID based on the role
  switch (role) {
    case "faculty":
      id = facultyId;
      break;
    case "hod":
      id = hodId;
      break;
    case "principal":
      id = principalId;
      break;
    case "hr":
      id = hrId;
      break;
    default:
      id = null;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/myprofile/${role}/${id}`)
      .then((response) => {
        console.log("hii");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
      });
  }, [id, role]);

  return (
    <div>
      <div>hiii</div>
      <p>{role}</p>
      <p>{id}</p>
    </div>
  );
};

export default Myprofile;*/
