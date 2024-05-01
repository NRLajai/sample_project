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

  console.log(leadData);
  const [formData, setFormData] = useState({
    name: leadData?.name ? leadData.name : "",
    company_details: leadData?.company_details ? leadData.company_details : "",
    tag: leadData?.tag ? leadData.tag : "",
    address: leadData?.address ? leadData.address : "",
    phone_number: leadData?.phone_number ? leadData.phone_number : "",
    follow_up_date: leadData?.follow_up_date
      ? new Date(leadData.follow_up_date)
      : "",
    status: leadData?.status ? leadData.status : "",
    image: leadData?.image ? leadData.image : null,
  });

  const statuses = [
    {
      label: "New",
      value: "New",
    },
    {
      label: "Won",
      value: "Won",
    },
    {
      label: "Hot",
      value: "Hot",
    },
    {
      label: "Lost",
      value: "Lost",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleChangeDate = (date) => {
    console.log(typeof date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      follow_up_date: date,
    }));
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
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-company"
              label="Company Details"
              name="company_details"
              variant="outlined"
              value={formData.company_details}
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-tag"
              label="Tag"
              name="tag"
              variant="outlined"
              value={formData.tag}
              onChange={handleChange}
            />
            <TextField
              className="addlead-field"
              id="id-address"
              label="address"
              name="address"
              variant="outlined"
              value={formData.address}
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
              value={formData.phone_number}
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric",
                maxLength: 10,
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="id-date"
                label="Date"
                name="follow_up_date"
                // value={formData.follow_up_date}
                onChange={handleChangeDate}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>

            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              name="status"
              // helperText="Please select status"
              // defaultValue="New"
              value={formData.status}
              onChange={handleChange}
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
                // value={formData.image}
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
