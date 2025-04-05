import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, Typography, Box } from "@mui/material";
import { gradientBg } from "../constants/color";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: gradientBg,
        padding: "1rem",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: "600px",
          padding: "2rem",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600} color="primary">
          Welcome to Chat App!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          A modern chat application with authentication, group chat, and
          anonymous messaging.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          ✨ Create and manage groups effortlessly.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          🔒 Chat anonymously with random users.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          🎉 Enjoy a seamless and user-friendly experience.
        </Typography>
        <Typography variant="h6" fontWeight={500} color="secondary">
          Start chatting now!
        </Typography>
      </Stack>
    </Box>
  );
};

export default AppLayout()(Home);
