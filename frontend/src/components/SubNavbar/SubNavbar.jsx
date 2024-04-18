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

  // const subnavStyle = {
  //   display: "inline-block",
  //   textDecoration: "none",
  //   backgroundColor: "green",
  //   padding: "0px 40px 0px 40px",
  //   color: "white",
  //   fontSize: "15px",
  //   position: "relative",
  // };

  // const linkStyle = {
  //   width: "15px",
  //   height: "15px",
  //   borderRadius: "50%",
  //   paddingRight: "5px",
  // };

  // const linkfontStyle = {
  //   fontSize: "8px",
  //   fontWeight: "bold",
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar" position="static">
          <Toolbar className="flex-container toolbar">
            {columns.map((navlink) => (
              <div className="Subnavlinks">
                {navlink.img}
                <div className="subnavlink-text">
                  <b className="linktitle">{navlink.title}</b>
                  <span className="spantext">
                    {navlink.count} {navlink.text}
                  </span>
                </div>
              </div>
            ))}
          </Toolbar>
        </AppBar>
      </Box>

      {/* <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{
          backgroundColor: "red",
          maxWidth: "100%",
          marginLeft: "2.5%",
          marginRight: "2.5%",
          height: "70px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center">
                          
              <Nav.Link href="/leads" style={useStyle}>
                <div className="d-inline-flex">
                  <ListAltIcon style={linkStyle} />
                  <b>Leads</b>
                  <p style={linkfontStyle}>12 leads are pedning</p>
                </div>
              </Nav.Link>

              <Nav.Link href="/accounts" style={useStyle}>
                <div className="d-inline-flex">
                  <AssignmentIcon style={linkStyle} />
                  <b>Accounts</b>
                  <p style={linkfontStyle}>10 active accounts</p>
                </div>
              </Nav.Link>

              <Nav.Link href="/contacts" style={useStyle}>
                <div className="d-inline-flex">
                  <ContactsIcon style={linkStyle} />
                  <b>Contacts</b>
                  <p style={linkfontStyle}>10 active users</p>
                </div>
              </Nav.Link>

              <Nav.Link href="/tasks" style={useStyle}>
                <div className="d-inline-flex">
                  <WatchLaterRoundedIcon style={linkStyle} />
                  <b>Tasks</b>
                  <p style={linkfontStyle}>10 tasks are pending</p>
                </div>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default SubNavbar;
