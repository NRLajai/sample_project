import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Leads from "../Core/Leads/Leads";
import LeadForm from "../Core/LeadForm/LeadForm";

// import { getLeads } from "../../services/LeadServices";
// import { getLeads } from "../../services/fakeLeads";
import "./MainCard.scss";
import { getLead } from "../../services/LeadServices";

const MainCard = () => {
  // const [data, setData] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [TabData, SetTabData] = useState("");
  const [currentTab, SetCurrentTab] = useState("1");
  const [leadutils, setLeadUtils] = useState({
    title: "",
    buttonText: "",
  });

  const handleTabData = (event, value) => {
    SetTabData(value);
  };

  const handleChangeTab = (event, value) => {
    // console.log(" changeTab to " + value);
    SetCurrentTab(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentTab === "2") {
        setLeadUtils((prevState) => ({
          ...prevState,
          title: "Add Lead",
          buttonText: "ADD LEAD",
        }));
      } else if (currentTab === "3") {
        try {
          const response = await getLead(TabData);
          setLeadData(response?.data || []);
          setLeadUtils((prevState) => ({
            ...prevState,
            title: "Edit Lead",
            buttonText: "EDIT LEAD",
          }));
        } catch (error) {
          // Handle error if needed
          console.error("Error fetching lead data:", error);
        }
      }
    };
    fetchData();
  }, [currentTab, TabData]);

  const TabLink = [
    {
      text: "All leads",
      tabValue: "1",
    },
    {
      text: "Add new lead",
      tabValue: "2",
    },
    {
      text: "Edit lead",
      tabValue: "3",
    },
  ];

  const TabPanelData = [
    {
      content: (
        <Leads
          addLeadTab={"2"}
          editLeadTab={"3"}
          TabData={handleTabData}
          changeTab={handleChangeTab}
          currentTab={currentTab}
        />
      ),
      tabValue: "1",
    },
    {
      content: <LeadForm leadutils={leadutils} />,
      tabValue: "2",
    },
    {
      content: <LeadForm leadutils={leadutils} leadData={leadData} />,
      tabValue: "3",
    },
  ];

  // console.log(" currentTab => " + currentTab);
  return (
    <>
      <Box
        className="mainbox"
        sx={{ flexgrow: 1, width: "100%", typography: "body1" }}
      >
        <TabContext value={currentTab}>
          <Box>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              {TabLink.map((tab, index) => (
                <Tab
                  className="new-tab hvr-wobble-top"
                  key={index}
                  value={tab.tabValue}
                  label={tab.text}
                />
              ))}
            </TabList>
          </Box>
          {TabPanelData.map((PanelData, index) => (
            <TabPanel
              className="tabpanel"
              value={PanelData.tabValue}
              key={index}
            >
              {PanelData.content}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default MainCard;
