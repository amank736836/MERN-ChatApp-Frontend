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
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const email = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword("");
  const confirmPassword = useStrongPassword("");
  const avatar = useFileHandler("single", 2);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 0, 0, 0.5), rgba(34, 21, 172, 0.5)), url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJsdXUlMjBzdGFyJTIwcGF0dGVybnxlbnwwfHx8fDE2OTY5NTQ1NzA&ixlib=rb-4.0.3&q=100&w=1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username or Email"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="username or email"
                  autoComplete="username or email"
                  autoFocus
                  value={username.value || email.value}
                  onChange={username.changeHandler || email.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  autoFocus
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: "1rem" }}
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Typography textAlign={"center"} m={"1rem"}>
                  Don't have an account?
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={toggleLogin}
                  >
                    Sign Up
                  </Button>
                </Typography>
                <Typography textAlign={"center"} m={"1rem"}>
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy.
                </Typography>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"8rem"} margin={"auto"}>
                  <Avatar
                    sx={{ width: "8rem", height: "8rem", objectFit: "contain" }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      "&:hover": {
                        color: "white",
                      },
                      bgcolor: "rgba(0,0,0,0.5)",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"0.5rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="name"
                  autoComplete="name"
                  autoFocus
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
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  name="password"
                  autoComplete="current-password"
                  autoFocus
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  autoComplete="current-password"
                  autoFocus
                  value={confirmPassword.value}
                  onChange={confirmPassword.changeHandler}
                />

                {confirmPassword.error && (
                  <Typography color="error" variant="caption">
                    {confirmPassword.error}
                  </Typography>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: "1rem" }}
                >
                  Sign Up
                </Button>
              </form>
              <Typography textAlign={"center"} mt={"1rem"}>
                OR
              </Typography>
              <Typography textAlign={"center"} m={"0.5rem"}>
                Already have an account?{" "}
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </Typography>
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
