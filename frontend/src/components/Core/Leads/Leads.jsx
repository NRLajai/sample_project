import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLeads, deleteLead } from "../../../services/LeadServices";
// import { getLeads } from "../../../services/fakeLeads";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./Leads.scss";
import "../../../hover.scss";

const Leads = (props) => {
  const { changeTab, addLeadTab, editLeadTab, TabData } = props;

  const [leadsData, setLeadsData] = useState([]);
  const [OldleadsData, setOldLeadsData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeads();
        setLeadsData(response?.data || []);
        setOldLeadsData(response?.data || []);
      } catch (error) {
        console.log("Could not able to fetch Leads:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (key) => {
    if (key) {
      const filtered = leadsData.filter((m) =>
        m.company_details.toLowerCase().startsWith(key.toLowerCase())
      );
      setLeadsData(filtered || []);
    } else {
      setLeadsData(OldleadsData || []);
    }
  };

  const rows = leadsData;

  const fontColor = "grey";
  const bkgColor = "white";
  const headerColor = "#e7ecf0";

  const Dates = {
    from_date: 20,
    from_month: "September",
    to_date: 20,
    to_month: "April",
    year: "2024",
  };

  const StatusCircle = (color) => (
    <Box
      component="div"
      width={13}
      height={13}
      borderRadius="50%"
      bgcolor={color}
      marginRight={1}
    />
  );

  const handlesearchQuery = (event) => {
    const searchKey = event.target.value;
    setsearchQuery(searchKey);
    handleSearch(searchKey);
  };

  const modifyDate = (datestr) => {
    if (datestr) {
      const date = new Date(datestr);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return null;
  };

  const daysLeft = (datestr) => {
    if (datestr) {
      const now = new Date();
      const targetDate = new Date(datestr);
      const differenceInTime = targetDate.getTime() - now.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      if (differenceInDays > 0) {
        return `${differenceInDays} days left`;
      } else {
        return `0 days left`;
      }
    }
    return null;
  };

  const capitalizeFirstLetter = (person) => {
    return person.charAt(0).toUpperCase() + person.slice(1);
  };

  const _DeleteRecord = async (id) => {
    // console.log(typeof id);
    // console.log(id);
    if (id === 33) {
      console.log("Poda dei...U cant delete my record");
      return;
    }
    const ExistLeads = leadsData;
    const updatedArray = leadsData.filter((lead) => lead.id !== parseInt(id));
    setLeadsData(updatedArray || []);
    try {
      deleteLead(id);
      console.log("Successfully deleted");
    } catch {
      setLeadsData(ExistLeads);
    }
  };

  const _OnClickRow = (e) => {
    const id = e.currentTarget.parentNode.parentNode.getAttribute("data-id");
    TabData(e, { id: id, newTab: editLeadTab });
    // changeTab(e, editLeadTab);
  };

  const columns = [
    {
      field: "image",
      headerName: "",
      headerClassName: "table-header",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <Box
            component="img"
            style={{
              borderRadius: "50%",
              textAlign: "center",
              width: "35px",
              height: "35px",
              maxWidth: "50px",
              maxHeight: "50px",
              margin: "auto",
            }}
            display="block"
            src={params?.row?.image}
            alt="Profile Image"
          />
        );
      },
    },
    {
      field: "company_details",
      headerName: "Company details",
      width: 450,
      headerClassName: "table-header",
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"} onClick={_OnClickRow}>
            <Box>
              <Typography
                component={"b"}
                display={"block"}
                fontSize={"0.9vw"}
                fontWeight={600}
                style={{ color: fontColor }}
              >
                {params?.row?.company_details}
              </Typography>
              <Typography fontSize={"0.8vw"}>{params?.row?.address}</Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "tag",
      headerName: "Project tag",
      width: 180,
      headerClassName: "table-header",
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"} onClick={_OnClickRow}>
            <Box>
              <Typography
                fontSize={"0.8vw"}
                fontWeight={600}
                style={{ color: fontColor }}
              >
                {params?.row?.tag}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Contact person",
      headerClassName: "table-header",
      type: "string",
      sortable: false,
      width: 250,
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"} onClick={_OnClickRow}>
            <Box>
              <Typography
                fontSize={"0.9vw"}
                fontWeight={600}
                style={{ color: fontColor }}
              >
                {params?.row?.name && capitalizeFirstLetter(params?.row?.name)}
              </Typography>
              <Typography
                fontSize={"0.8vw"}
                style={{ padding: "0px", margin: "0px" }}
              >
                {params?.row?.phone_number}
              </Typography>
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
      width: 220,
      // valueGetter: (value, row) =>
      //   `${row.firstName || ""} ${row.lastName || ""}`,
      renderCell: (params) => {
        return (
          <Box component={"div"} onClick={_OnClickRow}>
            <Box display={"flex"}>
              <Typography
                display={"inline-flex"}
                fontSize={"0.6vw"}
                style={{ paddingTop: "4px" }}
              >
                {params?.row?.status === "New" && StatusCircle("aqua")}
                {params?.row?.status === "Hot" && StatusCircle("red")}
                {params?.row?.status === "Lost" && StatusCircle("#cccccc")}
                {params?.row?.status === "Won" && StatusCircle("#61bc84")}
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
      field: "follow_up_date",
      headerName: "Follow-up date",
      headerClassName: "table-header",
      type: "string",
      width: 270,
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"} onClick={_OnClickRow}>
            <Typography
              fontSize={"0.9vw"}
              fontWeight={550}
              style={{ color: fontColor }}
            >
              {params?.row?.follow_up_date &&
                modifyDate(params?.row?.follow_up_date)}
            </Typography>
            <Typography fontSize={"0.7vw"}>
              {params?.row?.follow_up_date &&
                daysLeft(params?.row?.follow_up_date)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: null,
      headerName: "Actions",
      headerClassName: "table-header action-header",
      sortable: false,
      width: 348,
      // editable: true,
      renderCell: (params) => {
        const rowID = params?.row?.id;
        return (
          <Box
            component={"div"}
            display={"flex"}
            style={{
              justifyContent: "space-between",
              color: fontColor,
              fontSize: "large",
              maxWidth: "50%",
            }}
          >
            <LocalPhoneIcon className="hvr-buzz-out phone-icon" />
            <CalendarMonthIcon className="hvr-bounce-in" />
            <DeleteIcon
              className="hvr-bounce-in delete-icon"
              onClick={() => _DeleteRecord(rowID)}
            />
            <MoreVertIcon className="hvr-bounce-in" />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box className="flex-container leadboxmenu">
        <Box className="lead-title">
          <h1>All Leads</h1>
          <span>
            From {Dates.from_date} {Dates.from_month} to {Dates.to_date}{" "}
            {Dates.to_month} {Dates.year}
          </span>
        </Box>
        <Stack className="stack-box" direction="row" spacing={3}>
          <TextField
            className="search-bar"
            id="outlined-basic"
            variant="outlined"
            placeholder="Search leads"
            value={searchQuery}
            onChange={handlesearchQuery}
            InputProps={{
              endAdornment: (
                <SearchIcon
                  className="search-icon"
                  style={{ marginRight: "8%", color: "#6B7280" }}
                />
              ),
            }}
          />
          <Button
            className="add-new-btn"
            variant="contained"
            onClick={(e) => changeTab(e, addLeadTab)}
          >
            Add new
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          height: 560,
          width: "100%",
          "& .MuiDataGrid-cell": {
            backgroundColor: bkgColor,
          },
          "& .table-header": {
            backgroundColor: headerColor,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: bkgColor,
          },
        }}
      >
        <DataGrid
          autoHeight
          {...rows}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          // onRowClick={_OnClickRow}
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};
export default Leads;
