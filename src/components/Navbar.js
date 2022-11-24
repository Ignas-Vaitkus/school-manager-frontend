import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const auth = useContext(AuthContext);
  const [tabValue, steTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    steTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Schools" component={Link} to="/schools" />
          <Tab label="Requests" component={Link} to="/requests" />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ mx: 2 }}>Login</Box>
          <Box sx={{ mx: 2 }}>Register</Box>
          <Box sx={{ mx: 2 }}>Logout</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
