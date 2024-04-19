import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "./MainCard.scss";
import Leads from "../Core/Leads/Leads";
import AddLead from "../Core/AddLead/AddLead";
import EditLead from "../Core/EditLead/EditLead";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
      content: <Leads />,
      route: "/leads",
      tabValue: 1,
    },
    {
      content: <AddLead />,
      route: "/add-lead",
      tabValue: 2,
    },
    {
      content: <EditLead />,
      route: "/edit-lead",
      tabValue: 3,
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <Box
        className='mainbox'
        sx={{ flexgrow: 1, width: "100%", typography: "body1" }}
      >
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {TabLink.map((tab) => (
                <Tab
                  className='new-tab'
                  key={tab.text}
                  value={tab.tabValue}
                  label={tab.text}
                />
              ))}
            </TabList>
          </Box>
          {TabPanelData.map((PanelData) => (
            <TabPanel className='tabpanel' value={PanelData.tabValue}>
              {PanelData.content}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default MainCard;
