import * as React from "react";
import { useState } from "react";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./NavBar.scss";

const NavBar = () => {
  const [Navdata, SetNavdata] = useState({
    user: "Admin",
    greeting: "welcome",
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="nav-appbar" position="static">
          <Toolbar className="flex-container navbar-toolbar">
            <img
              alt="Project logo"
              src="/logo1.png"
              className="float-right navstyle"
            />
            <div style={{ display: "inline-flex" }}>
              <CircleNotificationsRoundedIcon
                className="navstyle navpadding hvr-buzz"
                fontSize="large"
                style={{
                  color: "grey",
                }}
              />
              <img
                className="navstyle navpadding"
                src="/profile.png"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  paddingRight: "6px",
                }}
              />
              <div
                className="navpadding"
                style={{
                  color: "grey",
                  maxWidth: "140px",
                }}
              >
                <b
                  className="font-weight-bold"
                  style={{
                    marginBottom: "0px",
                    marginTop: "8px",
                    paddingBottom: "0px",
                    fontSize: "100%",
                  }}
                >
                  {Navdata.user}
                </b>
                <p
                  style={{
                    marginTop: "0px",
                    paddingTop: "0px",
                    fontSize: "90%",
                  }}
                >
                  {Navdata.greeting}
                </p>
              </div>
              <SettingsIcon
                className="hvr-bounce-in navstyle navpadding"
                fontSize="large"
                style={{ color: "grey" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
