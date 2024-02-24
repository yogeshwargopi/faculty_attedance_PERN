import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import axios from "axios";

const AppStyledProvider = styled.div`
  height: 45vh;
  width: 90%;
  margin: auto;
  padding: 10px;
`;

const StyledTextField = styled(TextField)`
  margin: 5px 0;
  width: 30%;
`;

const FacultyDetails = () => {
  const [rows, setRows] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/facultydetails")
      .then((response) => {
        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.faculty_id,
        }));
        setRows(rowsWithId);
        setFilteredRows(rowsWithId);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchWord(searchTerm);
    const filteredData = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.department.toLowerCase().includes(searchTerm.toLowerCase())
      // Add more fields if needed for searching
    );
    setFilteredRows(filteredData);
  };

  const columns = [
    {
      field: "image",
      headerName: "Faculty",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <img
            width={40}
            height={40}
            style={{ borderRadius: "9999px", backgroundColor: "grey" }}
            src={params.image}
            alt="hii"
          />
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
    },
    { field: "email", headerName: "Email", width: 200, sortable: false },
    { field: "department", headerName: "Department", width: 200 },
    { field: "phone_no", headerName: "Phone", width: 200 },
  ];

  return (
    <div>
      <AppStyledProvider>
        <h2>Faculties List </h2>
        <StyledTextField
          value={searchWord}
          onChange={(event) => handleSearch(event.target.value)}
          label="Search Repositories"
          variant="outlined"
        />
        {filteredRows.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 7, 10]}
          />
        )}
      </AppStyledProvider>
    </div>
  );
};

export default FacultyDetails;
