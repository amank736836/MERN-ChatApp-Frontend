import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authBg } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin.thunk";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin]);

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

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
