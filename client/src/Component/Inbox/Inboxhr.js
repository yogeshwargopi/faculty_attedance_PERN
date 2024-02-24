import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Inboxpre.css";
import { FaTrash } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "department", headerName: "Department", width: 200 },
  { field: "leave_type", headerName: "Type of Leave", width: 200 },
  {
    field: "submitted_at",
    headerName: "Submitted At",
    type: "dateTime",
    width: 200,
    valueFormatter: (params) => {
      const submittedDate = new Date(params.value);
      const currentDate = new Date();

      // Check if the submission is within one day
      if (
        submittedDate.getFullYear() === currentDate.getFullYear() &&
        submittedDate.getMonth() === currentDate.getMonth() &&
        submittedDate.getDate() === currentDate.getDate()
      ) {
        // Display the time
        return submittedDate.toLocaleTimeString();
      } else {
        // Display the number of days ago (starting from 1)
        const timeDifference = currentDate - submittedDate;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
      }
    },
  },
];

const Inboxhr = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/hr/leave-application")
      .then((response) => {
        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.leave_id,
        }));
        setRows(rowsWithId);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Implement your refresh logic here
    axios
      .get("http://localhost:8080/hr/leave-application")
      .then((response) => {
        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.leave_id,
        }));
        setRows(rowsWithId);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data");
      })
      .finally(() => setLoading(false));
  };

  const defaultSortModel = [
    {
      field: "submitted_at",
      sort: "desc", // Set 'desc' for descending order
    },
  ];
  const handleRowClick = (params) => {
    const leave_id = params.row.leave_id;
    console.log("Clicked Leave ID:", leave_id);
    navigate(`${leave_id}`);
  };

  return (
    <div className="inbox_pre">
      <div className="inbox_title">INBOX</div>
      <div className="inbox_icons">
        <button>
          <FaTrash />
        </button>
        <button onClick={handleRefresh}>
          <FaSyncAlt />
        </button>
      </div>
      <div className="inbox_mess">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              sortModel={defaultSortModel}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 7, 10]}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inboxhr;
