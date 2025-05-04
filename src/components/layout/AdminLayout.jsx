import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { adminTabs } from "../../constants/adminTabs";
import { grayColor, matBlack } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin.thunk";

const LinkComponent = styled(Link)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 1rem;
  color: black;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
    transform: scale(1.05);
    background-color: rgba(0, 0, 0, 0.1);
  }
  display: inline-block;
`;

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack
      width={w}
      spacing={"3rem"}
      sx={{
        padding: {
          xs: "2rem 0.5rem",
          sm: "2rem 2rem",
          md: "2rem 3rem",
          lg: "2rem 4rem",
        },
      }}
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        Stealthy Note
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <LinkComponent
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                backgroundColor: matBlack,
                color: "white",
                "&:hover": {
                  backgroundColor: matBlack,
                  color: grayColor,
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={"1.2rem"} fontWeight={600}>
                {tab.name}
              </Typography>
            </Stack>
          </LinkComponent>
        ))}
        <LinkComponent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            onClick={logoutHandler}
          >
            <ExitToAppIcon />
            <Typography fontSize={"1.2rem"} fontWeight={600}>
              Logout
            </Typography>
          </Stack>
        </LinkComponent>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { isAdmin } = useSelector((state) => state.auth);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{ display: { sm: "block", md: "none" } }}
        position={"fixed"}
        right={"1rem"}
        top={"1rem"}
      >
        <IconButton color="inherit" onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid
        size={{ md: 4, lg: 3 }}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        size={{ xs: 12, md: 8, lg: 9 }}
        // height={"100vh"}
        bgcolor={grayColor}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
