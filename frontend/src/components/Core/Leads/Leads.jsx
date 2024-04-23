import * as React from "react";
import { useState, useEffect } from "react";
import { getLeads } from "../../../services/fakeLeads";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Leads.scss";
import "../../../hover.scss";

const Leads = () => {
  const fontColor = "grey";
  const bkgColor = "white";
  const headerColor = "#e7ecf0";

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

  const [Dates, setDates] = useState({
    from_date: 20,
    from_month: "September",
    to_date: 20,
    to_month: "April",
    year: "2024",
  });

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

  const columns = [
    {
      field: "image",
      headerName: "",
      headerClassName: "table-header",
      sortable: false,
      width: 70,
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
      // flex: 0.01,
      editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"}>
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
          <Box component={"div"}>
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
      field: "person",
      headerName: "Contact person",
      headerClassName: "table-header",
      type: "string",
      sortable: false,
      width: 250,
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"}>
            <Box>
              <Typography
                fontSize={"0.9vw"}
                fontWeight={600}
                style={{ color: fontColor }}
              >
                {params?.row?.person &&
                  capitalizeFirstLetter(params?.row?.person)}
              </Typography>
              <Typography
                // component={"span"}
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
          <Box component={"div"}>
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
      width: 250,
      // editable: true,
      renderCell: (params) => {
        return (
          <Box component={"div"}>
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
      renderCell: () => {
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
            <LocalPhoneIcon className="hvr-buzz-out" />
            <CalendarMonthIcon className="hvr-bounce-in" />
            <MoreVertIcon className="hvr-wobble-to-bottom-right" />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex-container leadboxfeatures">
        <div className="leadtitle">
          <h1>All Leads</h1>
          <span>
            From {Dates.from_date} {Dates.from_month} to {Dates.to_date}{" "}
            {Dates.to_month} {Dates.year}
          </span>
        </div>
      </div>

      <Box
        sx={{
          height: 570,
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
          // disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Leads;
