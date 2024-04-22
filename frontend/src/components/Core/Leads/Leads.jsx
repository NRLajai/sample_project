import * as React from "react";
import { useState, useEffect } from "react";
import { getLeads } from "../../../services/fakeLeads";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import "./Leads.scss";

const Leads = () => {
  const [state, SetState] = useState({
    rows: [],
    pageSize: 7,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  });

  useEffect(() => {
    const fetchData = async () => {
      SetState({ rows: getLeads() });
    };
    fetchData();
  }, []);

  const [Date, setDate] = useState({
    from_date: 20,
    from_month: "September",
    to_date: 20,
    to_month: "April",
    year: "2024",
  });

  const StatusCircle = (color) => (
    <Box
      component="div"
      width={12}
      height={12}
      borderRadius="50%"
      bgcolor={color}
      marginRight={1}
    />
  );

  const columns = [
    {
      field: "image",
      headerName: "",
      headerClassName: "table-header",
      sortable: false,
      width: 80,
    },
    {
      field: "company",
      headerName: "Company details",
      width: 450,
      headerClassName: "table-header",
      // flex: 0.01,
      editable: true,
    },
    {
      field: "tag",
      headerName: "Project tag",
      width: 160,
      headerClassName: "table-header",
      // editable: true,
    },
    {
      field: "person",
      headerName: "Contact person",
      headerClassName: "table-header",
      type: "string",
      sortable: false,
      width: 230,
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"} contact="contact_type">
            <Box>
              <Typography fontSize={"0.9vw"} fontWeight={600}>
                {params?.row?.person}
              </Typography>
              <Typography fontSize={"0.8vw"}>{params?.row?.mobile}</Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "table-header",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
      // valueGetter: (value, row) =>
      //   `${row.firstName || ""} ${row.lastName || ""}`,
      renderCell: (params) => {
        return (
          <Box component={"div"}>
            <Box display={"flex"}>
              <Typography display={"inline-flex"} fontSize={"0.9vw"}>
                {params?.row?.status === "New" && StatusCircle("blue")}
                {params?.row?.status === "Hot" && StatusCircle("red")}
                {params?.row?.status === "Lost" && StatusCircle("grey")}
                {params?.row?.status === "Won" && StatusCircle("green")}
              </Typography>
              <Typography
                display={"inline-flex"}
                fontSize={"0.9vw"}
                fontWeight={600}
              >
                {params?.row?.status}
              </Typography>
            </Box>

            <Typography fontSize={"0.8vw"}>status by word</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Follow-up date",
      headerClassName: "table-header",
      type: "string",
      width: 240,
      editable: true,
    },
    {
      field: null,
      headerName: "Actions",
      headerClassName: "table-header",
      sortable: false,
      // width: 350,
      editable: true,
    },
  ];

  return (
    <>
      <div className="flex-container leadboxfeatures">
        <div className="leadtitle">
          <h1>All Leads</h1>
          <span>
            From {Date.from_date} {Date.from_month} to {Date.to_date}{" "}
            {Date.to_month} {Date.year}
          </span>
        </div>
      </div>

      <Box
        sx={{
          height: 570,
          width: "100%",
          "& .MuiDataGrid-cell": {
            backgroundColor: "white",
          },
          "& .table-header": {
            backgroundColor: "#e7ecf0",
          },
        }}
      >
        <DataGrid
          autoHeight
          {...state.data}
          rows={state.rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Leads;
