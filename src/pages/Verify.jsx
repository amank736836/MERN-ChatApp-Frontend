import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authBg } from "../constants/color";
import { server } from "../constants/config";
import { usernameValidator } from "../lib/validators";
import { userExists } from "../redux/reducers/auth.reducer";

const Verify = () => {
  const query = new URLSearchParams(window.location.search);
  const usernameParam = query.get("identifier");
  const verifyCodeParam = query.get("verifyCode");

  const identifier = useInputValidation(usernameParam || "", usernameValidator);
  const [verifyCode, setVerifyCode] = useState(verifyCodeParam || "");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading("Updating password...");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/user/verify`,
        {
          identifier: identifier.value,
          verifyCode: verifyCode,
        },
        config
      );

      dispatch(userExists(data.user));

      toast.success("Account verified successfully", {
        duration: 1000,
        id: toastId,
      });
      toast
        .promise(new Promise((resolve) => resolve()), {
          loading: "Redirecting...",
          success: "Redirected!",
          error: "Redirect failed",
          id: toastId,
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Verification failed", {
        duration: 1000,
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            Verify Account
          </Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={handleVerify}
          >
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
              type="text"
              value={identifier.value}
              onChange={identifier.changeHandler}
            />
            <TextField
              required
              fullWidth
              label="Verification Code"
              margin="normal"
              variant="outlined"
              type="text"
              value={verifyCode}
              onChange={(e) => {
                if (
                  (RegExp(/^[0-9]+$/).test(e.target.value) ||
                    e.target.value === "") &&
                  (verifyCode.length < 6 || e.target.value.length < 6)
                ) {
                  setVerifyCode(e.target.value);
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              disabled={verifyCode.length !== 6 || isLoading}
            >
              Verify Account
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Verify;
