import { useInputValidation, useStrongPassword } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authBg } from "../constants/color";
import { server } from "../constants/config";
import { usernameValidator } from "../lib/validators";
import { userExists } from "../redux/reducers/auth.reducer";

const Forgot = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(true);

  const toggleVerify = () => setIsForgotPassword((prev) => !prev);

  const query = new URLSearchParams(window.location.search);
  const usernameParam = query.get("identifier");
  const verifyCodeParam = query.get("verifyCode");

  useEffect(() => {
    if (usernameParam && verifyCodeParam) {
      setIsForgotPassword(false);
    }
  }, [usernameParam, verifyCodeParam]);

  const identifier = useInputValidation(usernameParam || "", usernameValidator);
  const password = useStrongPassword("");
  const confirmPassword = useStrongPassword("");
  const [verifyCode, setVerifyCode] = useState(verifyCodeParam || "");
  const [isVerifyCodeValid, setIsVerifyCodeValid] = useState(false);

  useEffect(() => {
    if (verifyCode.length === 6) {
      setIsVerifyCodeValid(true);
    }
  }, [verifyCode]);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const toastId = toast.loading("Logging in...");

    try {
      const res = await axios.post(
        `${server}/user/forgotPassword`,
        {
          identifier: identifier.value,
        },
        config
      );

      dispatch(userExists(res.data.user));

      toast.success("Forgot password email sent!", {
        duration: 1000,
        id: toastId,
      });

      setIsForgotPassword(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed", {
        duration: 1000,
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
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
        `${server}/user/updatePassword`,
        {
          identifier: identifier.value,
          password: password.value,
          verifyCode: verifyCode,
        },
        config
      );

      dispatch(userExists(data.user));

      toast.success("Updated password successfully!", {
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
      toast.error(error?.response?.data?.message || "Update failed", {
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
          {isForgotPassword ? (
            <>
              <Typography variant="h5" fontWeight={600} color="primary">
                Forgot Password
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleForgotPassword}
              >
                <TextField
                  required
                  fullWidth
                  label="Username or Email"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  autoComplete="identifier email"
                  autoFocus
                  value={identifier.value}
                  onChange={identifier.changeHandler}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  Send Verification Code
                </Button>
                <Typography textAlign="center" mt={2}>
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={toggleVerify}
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  Verify Forgot Password
                </Button>
              </form>
              <Typography textAlign={"center"} m={"0.5rem"}>
                Know your password?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() =>
                    navigate(`/login?identifier=${identifier.value}`)
                  }
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={600} color="primary">
                Verify Forgot Password
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleUpdatePassword}
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
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={confirmPassword.value}
                  onChange={confirmPassword.changeHandler}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={
                    password.value !== confirmPassword.value ||
                    verifyCode.length !== 6 ||
                    isLoading
                  }
                >
                  Update Password
                </Button>
              </form>
              <Typography textAlign="center" mt={2}>
                OR
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={toggleVerify}
                disabled={isLoading}
              >
                Forgot Password
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Forgot;
