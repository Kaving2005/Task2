import React from "react";
import { IconButton } from "@mui/material";

const ThemeToggle = ({ mode, setMode }) => {
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // You can replace these image URLs with your own bulb icons (local or hosted)
  const bulbOn = "https://cdn-icons-png.flaticon.com/512/702/702797.png";   // bulb on (light)
  const bulbOff = "https://cdn-icons-png.flaticon.com/512/702/702814.png"; // bulb off (dark)

  return (
    <IconButton
      onClick={toggleMode}
      color="inherit"
      sx={{
        width: 48,
        height: 48,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.0)",
        },
      }}
    >
      <img
        src={mode === "light" ? bulbOn : bulbOff}
        alt="theme bulb"
        style={{
          width: "28px",
          height: "28px",
          filter: mode === "light" ? "none" : "brightness(0.8)",
        }}
      />
    </IconButton>
  );
};

export default ThemeToggle;
