import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "./MainCard.scss";

const MainCard = () => {
  const [value, setValue] = useState("one");
  const [TabLink, setTabLink] = useState([
    {
      text: "All leads",
      tabValue: 1,
    },
    {
      text: "Add new lead",
      tabValue: 2,
    },
    {
      text: "Edit lead",
      tabValue: 3,
    },
  ]);

  const [TabPanelData, setTabPanelData] = useState([
    {
      text: "Item One",
      route: "/leads",
      tabValue: "1",
    },
    {
      text: "Item Two",
      tabValue: "2",
    },
    {
      text: "Item Three",
      route: "/edit-lead",
      tabValue: "3",
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "26%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {TabLink.map((tab) => (
                <Tab
                  className="new-tab"
                  key={tab.text}
                  value={tab.tabValue}
                  label={tab.text}
                />
              ))}
            </TabList>
          </Box>
          {TabPanelData.map((PanelData) => (
            <TabPanel value={PanelData.tabValue}>{PanelData.text}</TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default MainCard;
