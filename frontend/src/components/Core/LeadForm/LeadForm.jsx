import React from "react";
import { useState, useEffect, useCallback } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, TextField, MenuItem } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveLead } from "../../../services/LeadServices";
import { toast } from "react-toastify";

import "./LeadForm.scss";

const LeadForm = (props) => {
  const { leadutils, leadData } = props;
  // const [leadData, setLeadData] = useState([]);

  const [formData, setFormData] = useState({
    name: leadData?.name ? leadData.name : "efw",
    company_details: leadData?.company_details
      ? leadData.company_details
      : "fewf",
    tag: leadData?.tag ? leadData.tag : "tag",
    address: leadData?.address ? leadData.address : "fewg",
    phone_number: leadData?.phone_number ? leadData.phone_number : "1234512345",
    follow_up_date: leadData?.follow_up_date
      ? leadData.follow_up_date
      : "2024-04-02",
    status: leadData?.status ? leadData.status : "New",
    image: leadData?.image ? leadData.image : null,
  });

  const statuses = [
    {
      label: "New",
      value: "N",
    },
    {
      label: "Won",
      value: "W",
    },
    {
      label: "Hot",
      value: "H",
    },
    {
      label: "Lost",
      value: "L",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      if (selectedFile.size > 1024 * 1024) {
        alert("File size exceeds the limit of 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: selectedFile,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (
      formData.name &&
      formData.company_details &&
      formData.tag &&
      formData.phone_number &&
      formData.status &&
      formData.image
    ) {
      let postFormData = new FormData();
      postFormData.append("name", formData.name);
      postFormData.append("company_details", formData.company_details);
      postFormData.append("tag", formData.tag);
      postFormData.append("phone_number", formData.phone_number);
      postFormData.append("status", formData.status);
      postFormData.append("image", formData.image);
      postFormData.append("address", formData.address);
      postFormData.append("follow_up_date", formData.follow_up_date);

      const response = await saveLead(postFormData);
      console.log(response.status);
      if (response.status === 201) {
        console.log("scueess");
      } else {
        console.log("error");
      }
    } else {
      console.log("ELSE");
      console.log(formData);
    }
  };

  return (
    <>
      <Box className="mainbox leadboxmenu">
        <h1>{leadutils.title}</h1>
      </Box>

      <Box
        className="form-container"
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box className="flex-container main-box">
          <Box className="box-1">
            <TextField
              className="addlead-field"
              id="id-name"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-company"
              label="Company Details"
              name="company_details"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-tag"
              label="Tag"
              name="tag"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-address"
              label="address"
              name="address"
              variant="outlined"
              onChange={handleChange}
            />
          </Box>

          <Box className="box-2">
            <TextField
              className="addlead-field"
              id="id-mobile"
              label="Phone number"
              name="phone_number"
              variant="outlined"
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric",
                maxLength: 10,
              }}
            />
            <TextField
              className="addlead-field"
              id="id-date"
              label="Date"
              name="follow_up_date"
              defaultValue="2024-04-01"
              variant="outlined"
              // onChange={handleChange}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="follow_up_date"
                value={formData.follow_up_date}
                onChange={handleChange}
              />
            </LocalizationProvider> */}

            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              name="status"
              onChange={handleChange}
              // helperText="Please select status"
              // defaultValue="New"
              value="N"
            >
              {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              className={`upload-img ${formData.image ? "image-selected" : ""}`}
              component="label"
              role={undefined}
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {formData.image ? "Uploaded" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                name="image"
                onChange={handleFileChange}
              />
              {/* <DeleteIcon /> */}
            </Button>
          </Box>
        </Box>

        <Button className="add-lead" variant="contained" onClick={handleSubmit}>
          {leadutils.buttonText}
        </Button>
      </Box>
    </>
  );
};

export default LeadForm;
