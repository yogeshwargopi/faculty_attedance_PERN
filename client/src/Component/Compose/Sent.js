import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
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

const Sent = ({ facultyId }) => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  console.log(facultyId);
  React.useEffect(() => {
    console.log(
      `Fetching data from: http://localhost:8080/faculty/sent/${facultyId}`
    );
    axios
      .get(`http://localhost:8080/faculty/sent/${facultyId}`)
      .then((response) => {
        console.log("Backend Response:", response);

        // Log the structure of the response data
        console.log(
          "Response Data Structure:",
          typeof response.data,
          response.data
        );

        // Use setRows directly with response.data
        setRows(
          Array.isArray(response.data)
            ? response.data.map((row) => ({ ...row, id: row.leave_id }))
            : [{ ...response.data, id: response.data.leave_id }]
        );
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, [facultyId]);

  const handleRefresh = () => {
    setLoading(true);
    // Implement your refresh logic here
    axios
      .get(`http://localhost:8080/faculty/sent/${facultyId}`)
      .then((response) => {
        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.leave_id,
        }));
        setRows(rowsWithId);
      })
      .catch((err) => {
        console.error(err);
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
        {!loading && (
          <div style={{ height: 800, width: "100%" }}>
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

export default Sent;
