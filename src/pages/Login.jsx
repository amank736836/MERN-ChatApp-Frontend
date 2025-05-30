import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { authBg } from "../constants/color";
import { server } from "../constants/config";
import { usernameValidator } from "../lib/validators";
import { userExists } from "../redux/reducers/auth.reducer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const query = new URLSearchParams(window.location.search);
  const identifierParam = query.get("identifier");
  let usernameParam;
  let emailParam;

  useEffect(() => {
    if (identifierParam) {
      if (identifierParam.includes("@")) {
        emailParam = identifierParam;
      } else {
        usernameParam = identifierParam;
      }
    }
  }, [identifierParam]);

  const name = useInputValidation("");
  const email = useInputValidation(emailParam || "");
  const username = useInputValidation(usernameParam || "", usernameValidator);
  const password = useStrongPassword("");
  const confirmPassword = useStrongPassword("");
  const avatar = useFileHandler("single", 2);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
        `${server}/user/login`,
        {
          identifier: username.value,
          password: password.value,
        },
        config
      );

      dispatch(userExists(res.data.user));

      toast.success("Login successful!", {
        duration: 1000,
        id: toastId,
      });

      toast
        .promise(new Promise((resolve) => resolve()), {
          loading: "Redirecting...",
          success: "Redirected!",
          error: "Redirect failed",
          id: toastId,
          duration: 1000,
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message === "User not found") {
        toast.error("User not found", {
          duration: 1000,
          id: toastId,
        });
        toggleLogin();
        return;
      }
      if (error?.response?.data?.message === "Invalid password") {
        toast.error("Invalid password", {
          duration: 1000,
          id: toastId,
        });
        navigate(`/forgot?identifier=${username.value}`);
        return;
      }

      toast.error(error?.response?.data?.message || "Login failed", {
        duration: 1000,
        id: toastId,
      });
      toast
        .promise(new Promise((resolve) => resolve()), {
          loading: "Redirecting...",
          success: "Redirected!",
          error: "Redirect failed",
          id: toastId,
          duration: 1000,
        })
        .then(() => {
          navigate(`/verify?identifier=${username.value}`);
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDate = new FormData();
    formDate.append("avatar", avatar.file);
    formDate.append("name", name.value);
    formDate.append("username", username.value);
    formDate.append("email", email.value);
    formDate.append("password", password.value);

    const toastId = toast.loading("Signing up...");
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${server}/user/new`, formDate, config);

      dispatch(userExists(data.user));

      toast.success("Sign up successful!", {
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
          navigate("/verify?identifier=" + username.value);
        });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Sign up failed", {
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
          {isLogin ? (
            <>
              <Typography variant="h5" fontWeight={600} color="primary">
                Login
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username or Email"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  autoComplete="username email"
                  autoFocus
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography textAlign="center" mt={2}>
                  Don't have an account?{" "}
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={toggleLogin}
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </form>
              <Typography textAlign={"center"} m={"0.5rem"}>
                Forgot your password?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() =>
                    navigate(`/forgot?identifier=${username.value}`)
                  }
                  sx={{ textTransform: "none" }}
                >
                  Reset it
                </Button>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={600} color="primary">
                Sign Up
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignUp}
              >
                <Stack position="relative" width="8rem" margin="auto">
                  <Avatar
                    sx={{ width: "8rem", height: "8rem" }}
                    src={avatar.preview}
                    alt="Avatar"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  value={email.value}
                  onChange={email.changeHandler}
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
                    password.value !== confirmPassword.value || isLoading
                  }
                >
                  Sign Up
                </Button>
              </form>
              <Typography textAlign="center" mt={2}>
                Already have an account?{" "}
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={toggleLogin}
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"0.5rem"}>
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
