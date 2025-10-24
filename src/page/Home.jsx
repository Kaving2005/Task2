import React from "react";
import { Box, Typography, Button, Avatar, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Home = ({ setActiveSection }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <Paper
        elevation={6}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 800,
          textAlign: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(25,25,25,0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Profile Section */}
        <Stack spacing={3} alignItems="center">
          <Avatar
            alt="Profile Picture"
            src="src/assets/Kaving.jpg" 
            sx={{
              width: 120,
              height: 120,
              mt:5,
              border: "3px solid #1976d2",
              boxShadow: 4,
            }}
            component={motion.div}
            whileHover={{ scale: 1.1 }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm <span style={{ color: "#1976d2" }}>Kavin</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{ opacity: 0.8 }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Frontend Developer | React Enthusiast | UI Designer
          </Typography>

          <Typography
            variant="body1"
            sx={{ maxWidth: 600, mt: 1, lineHeight: 1.8 }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Passionate about crafting modern, responsive, and user-friendly web
            applications using React and Material UI. I enjoy building creative
            solutions that bring ideas to life.
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("timer")} 
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("contact")}
            >
              Contact Me
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
