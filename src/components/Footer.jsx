import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        mt: 4,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {currentYear} My React App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
