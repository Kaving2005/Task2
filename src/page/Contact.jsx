import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_449no5z", "template_r7wq61g", form.current, {
        publicKey: "bJ2EYabFe9S73A1PK",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(25,25,25,0.85)",
          backdropFilter: "blur(60px)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          Contact Us
        </Typography>

        <form ref={form} onSubmit={sendEmail}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="user_name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="user_email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Number"
              name="number"
              type="number"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
