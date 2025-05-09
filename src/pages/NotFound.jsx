import { Error as ErrorIcon } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
        <ErrorIcon
          sx={{ fontSize: "5rem", color: "#ff4c4c", marginRight: 1 }}
        />
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>

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
