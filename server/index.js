const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = 10;

const fs = require("fs");

// Function to convert a file to Base64 encoding
const fileToBase64 = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return fileData.toString("base64");
};

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

//add user apiisss

//principal sign up api
app.post("/signup/principal", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), salt);

    const psql =
      "INSERT INTO principal (name, email, password, image, phone_no) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.image,
      req.body.phone,
    ];
    const result = await db.query(psql, values);
    res.json({ status: "success", principal: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//addfaculty api
app.post("/addfaculty", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), salt);

    const psql =
      "INSERT INTO faculty (name, email, password, image, phone_no, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.image,
      req.body.phone,
      req.body.department,
    ];
    const result = await db.query(psql, values);
    res.json({ status: "success", faculty: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//add hod
app.post("/addhod", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), salt);

    const psql =
      "INSERT INTO hod (name, email, password, image, phone_no, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.image,
      req.body.phone,
      req.body.department,
    ];
    const result = await db.query(psql, values);
    res.json({ status: "success", hod: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//add hr
app.post("/addhr", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), salt);

    const psql =
      "INSERT INTO hr (name, email, password, image, phone_no) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.image,
      req.body.phone,
    ];
    const result = await db.query(psql, values);
    res.json({ status: "success", hr: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login apis
// Login principal
app.post("/login/principal", async (req, res) => {
  const psql = "SELECT * FROM principal WHERE email = $1";
  db.query(psql, [req.body.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Login error in server" });
    }

    if (data && data.rows && data.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data.rows[0].password,
        (err, response) => {
          console.log(response);

          if (err) {
            console.error(err);
            return res.json({ Error: "password compare error" });
          }

          if (response) {
            const name = data.rows[0].name;
            const email = data.rows[0].email;

            const token = jwt.sign({ name, email }, "P@ssw0rd#1S3cr3tK3y");
            res.cookie("token", token);
            return res.json({ status: "Success" });
          } else {
            return res.json({ Error: "Invalid password" });
          }
        }
      );
    } else {
      return res.json({ Error: "no email existed" });
    }
  });
});

// Login hod
app.post("/login/hod", async (req, res) => {
  const psql = "SELECT * FROM hod WHERE email = $1";
  db.query(psql, [req.body.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Login error in server" });
    }

    if (data && data.rows && data.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data.rows[0].password,
        (err, response) => {
          console.log(response);

          if (err) {
            console.error(err);
            return res.json({ Error: "password compare error" });
          }

          if (response) {
            const name = data.rows[0].name;
            const email = data.rows[0].email;

            const token = jwt.sign({ name, email }, "P@ssw0rd#1S3cr3tK3y");
            res.cookie("token", token);
            return res.json({ status: "Success" });
          } else {
            return res.json({ Error: "Invalid password" });
          }
        }
      );
    } else {
      return res.json({ Error: "no email existed" });
    }
  });
});
// Login hr
app.post("/login/hr", async (req, res) => {
  const psql = "SELECT * FROM hr WHERE email = $1";
  db.query(psql, [req.body.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Login error in server" });
    }

    if (data && data.rows && data.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data.rows[0].password,
        (err, response) => {
          console.log(response);

          if (err) {
            console.error(err);
            return res.json({ Error: "password compare error" });
          }

          if (response) {
            const name = data.rows[0].name;
            const email = data.rows[0].email;

            const token = jwt.sign({ name, email }, "P@ssw0rd#1S3cr3tK3y");
            res.cookie("token", token);
            return res.json({ status: "Success" });
          } else {
            return res.json({ Error: "Invalid password" });
          }
        }
      );
    } else {
      return res.json({ Error: "no email existed" });
    }
  });
});
// Login faculty
app.post("/login/faculty", async (req, res) => {
  const psql = "SELECT * FROM faculty WHERE email = $1";
  db.query(psql, [req.body.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Login error in server" });
    }

    if (data && data.rows && data.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data.rows[0].password,
        (err, response) => {
          console.log(response);

          if (err) {
            console.error(err);
            return res.json({ Error: "password compare error" });
          }

          if (response) {
            const name = data.rows[0].name;
            const email = data.rows[0].email;

            const token = jwt.sign({ name, email }, "P@ssw0rd#1S3cr3tK3y");
            res.cookie("token", token);
            return res.json({ status: "Success" });
          } else {
            return res.json({ Error: "Invalid password" });
          }
        }
      );
    } else {
      return res.json({ Error: "no email existed" });
    }
  });
});

//home page routes
//principal page api
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "We need token Please provide it." });
  } else {
    jwt.verify(token, "P@ssw0rd#1S3cr3tK3y", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" }); //Forbidden
      } else {
        const email = decoded.email; // Assuming the email is stored in the token
        req.email = email;
        // Fetch user details from the database using the email
        const psql =
          "SELECT principal_id,name, image FROM principal WHERE email = $1";
        db.query(psql, [email], (err, data) => {
          if (err) {
            console.error(err);
            return res.json({
              Message: "Error fetching user details from the database",
            });
          }

          if (data && data.rows && data.rows.length > 0) {
            req.id = data.rows[0].principal_id;
            req.name = data.rows[0].name;
            req.image = data.rows[0].image;
            // Assuming the image is stored in the 'image' field
            next();
          } else {
            return res.json({ Message: "User not found in the database" });
          }
        });
      }
    });
  }
};

app.get("/principal", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    id: req.id,
    name: req.name,
    image: req.image,
    email: req.email,
  });
});

//hod page api
const verifyhod = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "We need token Please provide it." });
  } else {
    jwt.verify(token, "P@ssw0rd#1S3cr3tK3y", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" }); //Forbidden
      } else {
        const email = decoded.email; // Assuming the email is stored in the token
        req.email = email;
        // Fetch user details from the database using the email
        const psql =
          "SELECT hod_id,name, image, department FROM hod WHERE email = $1";
        db.query(psql, [email], (err, data) => {
          if (err) {
            console.error(err);
            return res.json({
              Message: "Error fetching user details from the database",
            });
          }

          if (data && data.rows && data.rows.length > 0) {
            req.id = data.rows[0].hod_id;
            req.name = data.rows[0].name;
            req.image = data.rows[0].image;
            req.department = data.rows[0].department;
            // Assuming the image is stored in the 'image' field
            next();
            console.log(req.department);
          } else {
            return res.json({ Message: "User not found in the database" });
          }
        });
      }
    });
  }
};
app.get("/hod", verifyhod, (req, res) => {
  return res.json({
    Status: "Success",
    id: req.id,
    name: req.name,
    image: req.image,
    email: req.email,
    department: req.department,
  });
});
//faculty page api
const verifyfaculty = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "We need a token. Please provide it." });
  } else {
    try {
      const decoded = jwt.verify(token, "P@ssw0rd#1S3cr3tK3y");
      const email = decoded.email;

      const psql =
        "SELECT faculty_id, name, image, department FROM faculty WHERE email = $1";
      const { rows } = await db.query(psql, [email]);

      if (rows && rows.length > 0) {
        req.id = rows[0].faculty_id;
        req.name = rows[0].name;
        req.image = rows[0].image;
        req.department = rows[0].department;
        req.email = email;
        next();
      } else {
        return res.json({ Message: "User not found in the database" });
      }
    } catch (err) {
      console.error(err);
      return res.json({ Message: "Authentication error" });
    }
  }
};

app.get("/faculty", verifyfaculty, (req, res) => {
  return res.json({
    Status: "Success",
    id: req.id,
    name: req.name,
    image: req.image,
    email: req.email,
    department: req.department,
  });
});

//hr page api
const verifyhr = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "We need token Please provide it." });
  } else {
    jwt.verify(token, "P@ssw0rd#1S3cr3tK3y", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" }); //Forbidden
      } else {
        const email = decoded.email; // Assuming the email is stored in the token
        req.email = email;
        // Fetch user details from the database using the email
        const psql = "SELECT hr_id,name, image FROM hr WHERE email = $1";
        db.query(psql, [email], (err, data) => {
          if (err) {
            console.error(err);
            return res.json({
              Message: "Error fetching user details from the database",
            });
          }

          if (data && data.rows && data.rows.length > 0) {
            req.id = data.rows[0].hr_id;
            req.name = data.rows[0].name;
            req.image = data.rows[0].image;
            // Assuming the image is stored in the 'image' field
            next();
          } else {
            return res.json({ Message: "User not found in the database" });
          }
        });
      }
    });
  }
};
app.get("/hr", verifyhr, (req, res) => {
  return res.json({
    Status: "Success",
    id: req.id,
    name: req.name,
    image: req.image,
    email: req.email,
  });
});

//list of faculty
app.get("/facultydetails", async (req, res) => {
  try {
    const faculty = await db.query("SELECT * FROM faculty");
    res.json(faculty.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//list of hod
app.get("/hoddetails", async (req, res) => {
  try {
    const faculty = await db.query("SELECT * FROM hod");
    res.json(faculty.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//list of hr
app.get("/hrdetails", async (req, res) => {
  try {
    const faculty = await db.query("SELECT * FROM hr");
    res.json(faculty.rows);
  } catch (error) {
    //console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//leave application
//save database
app.post("/leave-application", async (req, res) => {
  try {
    const {
      faculty_id,
      email,
      name,
      designation,
      department,
      leaveType,
      leaveStartDate,
      leaveStartTime,
      leaveEndDate,
      leaveEndTime,
      purpose,
      attachment,
    } = req.body;

    // Calculate expiry date (10 days from leave start date)
    const leaveExpiryDate = new Date(leaveStartDate);
    leaveExpiryDate.setDate(leaveExpiryDate.getDate() + 10);

    const insertLeaveQuery = `
      INSERT INTO leave_application (
        faculty_id,
        email,
        name,
        designation,
        department,
        leave_type,
        leave_start_date,
        leave_start_time,
        leave_end_date,
        leave_end_time,
        purpose,
        attachment,
        expiry_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;

    const values = [
      faculty_id,
      email,
      name,
      designation,
      department,
      leaveType,
      leaveStartDate,
      leaveStartTime,
      leaveEndDate,
      leaveEndTime,
      purpose,
      attachment,
      leaveExpiryDate,
    ];

    const result = await db.query(insertLeaveQuery, values);
    res.json({ status: "success", leave: result.rows[0] });

    // Schedule a task to delete the leave application after 10 days
    const leaveExpiryMillis = leaveExpiryDate.getTime();
    const currentTimeMillis = Date.now();
    const timeDifferenceMillis = leaveExpiryMillis - currentTimeMillis;

    if (timeDifferenceMillis > 0) {
      setTimeout(async () => {
        // Delete the leave application
        const deleteQuery = `
          DELETE FROM leave_application
          WHERE leave_id = $1;
        `;
        await db.query(deleteQuery, [result.rows[0].leave_id]);
      }, timeDifferenceMillis);
    }
  } catch (error) {
    //console.error("Error submitting leave application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/leave-application", async (req, res) => {
  try {
    const users = await db.query(
      "SELECT * FROM leave_application WHERE hod_approval_status = 'APPROVED'"
    );
    res.json(users.rows);
  } catch (error) {
    //console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/hr/leave-application", async (req, res) => {
  try {
    const users = await db.query(
      "SELECT * FROM leave_application WHERE principal_approval_status = 'APPROVED'"
    );
    res.json(users.rows);
  } catch (error) {
    //console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/leave-application/:department", async (req, res) => {
  const department = req.params.department;
  try {
    const query = {
      text: "SELECT * FROM leave_application WHERE department = $1",
      values: [department],
    };
    const result = await db.query(query);

    if (result && result.rows.length > 0) {
      const leaveApplications = result.rows;
      //console.log("Leave Applications Data:", leaveApplications);
      res.json(leaveApplications);
    } else {
      res.status(404).json({
        error: "No leave applications found for the specified department",
      });
    }
  } catch (error) {
    //console.error("Error fetching leave applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sent/:leave_id", async (req, res) => {
  const leave_id = req.params.leave_id;
  //console.log(leave_id);
  try {
    const query = {
      text: "SELECT * FROM leave_application WHERE leave_id = $1",
      values: [leave_id],
    };

    const result = await db.query(query);
    //console.log("Query Result:", result);

    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      //console.log("User Data:", user);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/inbox/:leave_id", async (req, res) => {
  const leave_id = req.params.leave_id;
  //console.log(leave_id);
  try {
    const query = {
      text: "SELECT * FROM leave_application WHERE leave_id = $1",
      values: [leave_id],
    };

    const result = await db.query(query);
    //console.log("Query Result:", result);

    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      console.log("User Data:", user);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Backend route for HOD to approve leave
app.put("/hod/approve/:leave_id", async (req, res) => {
  try {
    const leaveId = req.params.leave_id;

    // Update the leave_application table to set HOD approval status to 'APPROVED'
    const updateQuery = `
      UPDATE leave_application
      SET hod_approval_status = 'APPROVED'
      WHERE leave_id = $1
      RETURNING *;
    `;

    const result = await db.query(updateQuery, [leaveId]);
    res.json({ status: "success", leave: result.rows[0] });
  } catch (error) {
    //console.error("Error approving leave:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Backend route for HOD to reject leave
app.put("/hod/reject/:leave_id", async (req, res) => {
  try {
    const leaveId = req.params.leave_id;

    // Update the leave_application table to set HOD approval status to 'REJECTED'
    const updateQuery = `
      UPDATE leave_application
      SET hod_approval_status = 'REJECTED'
      WHERE leave_id = $1
      RETURNING *;
    `;

    const result = await db.query(updateQuery, [leaveId]);
    res.json({ status: "success", leave: result.rows[0] });
  } catch (error) {
    //console.error("Error rejecting leave:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Backend route for principal to approve leave
app.put("/principal/approve/:leave_id", async (req, res) => {
  try {
    const leaveId = req.params.leave_id;

    // Update the leave_application table to set principal approval status to 'APPROVED'
    const updateQuery = `
      UPDATE leave_application
      SET principal_approval_status = 'APPROVED'
      WHERE leave_id = $1
      RETURNING *;
    `;

    const result = await db.query(updateQuery, [leaveId]);
    res.json({ status: "success", leave: result.rows[0] });
  } catch (error) {
    //console.error("Error approving leave:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Backend route for principal to reject leave
app.put("/principal/reject/:leave_id", async (req, res) => {
  try {
    const leaveId = req.params.leave_id;

    // Update the leave_application table to set principal approval status to 'REJECTED'
    const updateQuery = `
      UPDATE leave_application
      SET principal_approval_status = 'REJECTED'
      WHERE leave_id = $1
      RETURNING *;
    `;

    const result = await db.query(updateQuery, [leaveId]);
    res.json({ status: "success", leave: result.rows[0] });
  } catch (error) {
    //console.error("Error rejecting leave:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/faculty/sent/:facultyId", async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    const query = {
      text: "SELECT * FROM leave_application WHERE faculty_id = $1",
      values: [facultyId],
    };

    const result = await db.query(query);

    if (result.rows.length > 0) {
      const leaveApplications = result.rows;
      res.json(leaveApplications);
    } else {
      res.status(404).json({
        error: "No leave applications found for the specified faculty",
      });
    }
  } catch (error) {
    //console.error("Error fetching leave applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/faculty/send/:facultyId", async (req, res) => {
  const userEmail = req.params.facultyId;
  //console.log(userEmail);
  try {
    const query = {
      text: "SELECT * FROM leave_application WHERE faculty_id = $1",
      values: [userEmail],
    };

    const result = await db.query(query);

    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      //console.log("User Data:", user);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//faculty myprofile
//app.get("faculty/myprofile")

app.get("/myprofile/:role/:id", async (req, res) => {
  const Role = req.params.role;
  const id = req.params.id;
  let idd;
  switch (Role) {
    case "faculty":
      idd = "faculty_id";
      break;
    case "hod":
      idd = "hod_id";
      break;
    case "principal":
      idd = "principal_id";
      break;
    case "hr":
      idd = "hr_id";
      break;
    default:
      idd = null;
  }

  try {
    const query = {
      text: `SELECT * FROM ${Role} WHERE ${idd} = $1`,
      values: [id],
    };

    const result = await db.query(query);

    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  //console.log(Role);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server is on PORT" + PORT));
