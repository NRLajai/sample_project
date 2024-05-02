import React from "react";
import { useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import Box from "@mui/material/Box";
import "./SubNavbar.scss";

const SubNavbar = () => {
  const [columns, Setcolumns] = useState([
    {
      title: "Leads",
      img: <ListAltIcon />,
      count: 0,
      text: "leads are pending",
    },
    {
      title: "Accounts",
      img: <AssignmentIcon />,
      count: 0,
      text: "active accounts",
    },
    {
      title: "Contacts",
      img: <ContactsIcon />,
      count: 0,
      text: "active users",
    },
    {
      title: "Tasks",
      img: <WatchLaterRoundedIcon />,
      count: 0,
      text: "tasks are pending",
    },
  ]);

  const handleSubnavBar = (title, totalCount) => {
    // Setcolumns((prevState) =>
    //   prevState.map((column) =>
    //     column.title === title ? { ...column, count: totalCount } : column
    //   )
    // );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box className="subnavbar" component={"div"}>
          {columns.map((column, index) => (
            <Box
              className="flex-container nav-link hvr-bounce-to-top"
              component={"div"}
              key={index}
            >
              <Box className="nav-icon">{column.img}</Box>
              <Box className="nav-text">
                <Box className="nav-title" component={"b"}>
                  {column.title}
                </Box>
                <Box className="nav-count" component={"span"}>
                  {column.count} {column.text}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SubNavbar;
