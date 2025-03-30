import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", color: "#ff4c4c" }}
      >
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Box
        component="img"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/media/7bc57fe8b53a7d7592b7de3ff09551d0.gif"
        alt="Not Found"
        sx={{ width: "100%", maxWidth: 400, my: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;