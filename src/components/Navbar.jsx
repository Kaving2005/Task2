import { useState, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../page/ThemeToggle";
import TodoList from "../page/TodoList";
import TimerSection from "../page/TimerSection";
import Footer from "./Footer";
import lightBg from "../assets/light-bg.mp4";
import darkBg from "../assets/dark-bg.mp4";
import Home from "../page/Home"
import Contact from "../page/Contact"



function Navbar() {
  const [mode, setMode] = useState("light");
  const [activeSection, setActiveSection] = useState("home");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f5f5", paper: "#fff" },
                text: { primary: "#000" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#fff" },
              }),
        },
      }),
    [mode]
  );

  // 🌌 Background videos
  // const lightBg = "../assets/light-bg.mp4"; // example: day sky, clouds, etc.
  // const darkBg = "../assets/dark-bg.mp4";  // example: stars, space, etc.

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* 🎥 Animated Background */}
        <AnimatePresence mode="wait">
          
          <motion.video
            key={mode}
            src={mode === "light" ? lightBg : darkBg}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
              filter: mode === "dark" ? "brightness(0.7)" : "brightness(1)",
            }}
          />
          
        </AnimatePresence>

        {/* 🌐 Navbar */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AppBar position="static" color="primary" elevation={4}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
               React 
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  color="inherit"
                  onClick={() => setActiveSection("todo")}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Todo List
                </Button>

                <Button
                  color="inherit"
                  onClick={() => setActiveSection("timer")}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Timer
                </Button>
                
                <Button
                  color="inherit"
                  onClick={() => setActiveSection("contact")}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ContactUs
                </Button>

                <Button
                  color="inherit"
                  onClick={() => setActiveSection("home")}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </Button>

                <ThemeToggle mode={mode} setMode={setMode} />
              </Box>
            </Toolbar>
          </AppBar>
        </motion.div>

        {/* 🔄 Main Content */}
        <Box sx={{ flex: 1, p: 3, textAlign: "center", color: theme.palette.text.primary }}>
          <AnimatePresence mode="wait">
            {activeSection === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                <Home setActiveSection={setActiveSection} />
              </motion.div>
            )}

            {activeSection === "todo" && (
              <motion.div
                key="todo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TodoList />
              </motion.div>
            )}

            {activeSection === "timer" && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <TimerSection />
              </motion.div>
            )}
            {activeSection === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* 🌙 Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
