import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { authBg } from "../../constants/color";

const isAdmin = true;

const AdminLogin = () => {
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div
      style={{
        backgroundImage: authBg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary">
            Admin Login
          </Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="SecretKey"
              margin="normal"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
