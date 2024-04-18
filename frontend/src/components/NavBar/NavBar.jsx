import * as React from "react";
import { useState } from "react";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const NavBar = () => {
  const [Navdata, SetNavdata] = useState({
    user: "Admin",
    greeting: "welcome",
  });

  const navStyle = {
    width: "50px",
    height: "50px",
    display: "inline-block",
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            // backgroundColor: "blue",
            boxShadow: "none",
            padding: "0px 0px 10px 0px",
          }}
        >
          <Toolbar
            className="flex-container"
            style={{
              justifyContent: "space-between",
              backgroundColor: "white",
              borderBlockStyle: "none",
              padding: "0px",
            }}
          >
            <img
              alt="Project logo"
              src="/logo1.png"
              className="float-right"
              style={navStyle}
            />
            <div style={{ display: "inline-flex" }}>
              <CircleNotificationsRoundedIcon
                fontSize="large"
                style={{
                  ...navStyle,
                  color: "grey",
                  marginRight: "10px",
                  marginTop: "0px",
                }}
              />
              <img
                src="/profile.png"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  paddingTop: "5px",
                  paddingLeft: "6px",
                  color: "grey",
                  maxWidth: "140px",
                  marginRight: "15px",
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
                fontSize="large"
                style={{ ...navStyle, color: "grey" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
