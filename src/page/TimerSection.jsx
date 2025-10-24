import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Button, Typography, Stack, Paper, Divider } from "@mui/material";

const TimerSection = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]); // 🕓 Store history of start/stop times
  const intervalRef = useRef(null);

  // Format time as mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // 🕒 Format current time (HH:MM:SS)
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  // ✅ Start timer
  const handleStart = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      setHistory((prev) => [
        ...prev,
        { action: "Started", time: getCurrentTime() },
      ]);
    }
  }, [isRunning]);

  // ✅ Stop timer
  const handleStop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      setHistory((prev) => [
        ...prev,
        { action: "Stopped", time: getCurrentTime() },
      ]);
    }
  }, [isRunning]);

  // ✅ Reset timer
  const handleReset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
    setHistory([]); // Clear history on reset
  }, []);

  // ✅ Effect to manage timer logic with cleanup
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup on stop or unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          width: "320px",
          borderRadius: 3,
          alignSelf: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Timer Section
        </Typography>

        <Typography
          variant="h3"
          sx={{
            my: 2,
            color: "primary.main",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(seconds)}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleStop}
            disabled={!isRunning}
          >
            Stop
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Paper>

      {/* 🧾 Timer History Section */}
      {history.length > 0 && (
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mt: 2,
            width: "320px",
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            ⏳ Timer History
          </Typography>
          <Divider sx={{ mb: 1 }} />

          {history.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color:
                  item.action === "Started"
                    ? "success.main"
                    : "error.main",
              }}
            >
              {item.action} at {item.time}
            </Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default TimerSection;
