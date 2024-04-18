import React from "react";
import { useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar" position="static">
          <Toolbar className="flex-container toolbar">
            {columns.map((navlink) => (
              <div key={navlink.title} className="Subnavlinks">
                {navlink.img}
                <div>
                  <b>{navlink.title}</b>
                  <span>
                    {navlink.count} {navlink.text}
                  </span>
                </div>
              </div>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default SubNavbar;
