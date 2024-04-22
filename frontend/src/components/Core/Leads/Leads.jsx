import * as React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getLeads } from "../../../services/fakeLeads";
import "./Leads.scss";
import Table from "../../common/Table/Table";

const Leads = () => {
  const [state, SetState] = useState({
    data: [],
    pageSize: 7,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  });

  useEffect(() => {
    const fetchData = async () => {
      SetState({ data: getLeads() });
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

  const columns = [
    { field: "image", headerName: null, path: "image" },
    {
      field: "Company details",
      headerName: "Company Details",
      path: "company",
    },
    { field: "Project tag", headerName: "Project tag", path: "tag" },
    {
      field: "Contact person",
      headerName: "Contact person",
      type: "number",
      path: "person",
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      path: "status",
    },
    { field: "Follow-up date", headerName: "Follow-up date", path: "date" },
    { field: "Actions", headerName: "Actions" },
  ];

  return (
    <>
      <div className='flex-container leadboxfeatures'>
        <div className='leadtitle'>
          <h1>All Leads</h1>
          <span>
            From {Date.from_date} {Date.from_month} to {Date.to_date}{" "}
            {Date.to_month} {Date.year}
          </span>
        </div>
      </div>

      <Box className='leadtable'>
        <Table data={state.data} columns={columns} />
      </Box>
    </>
  );
};

export default Leads;
