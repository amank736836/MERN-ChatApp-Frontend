import {
  Add as AddIcon,
  Close as CloseIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";

const SearchDialog = lazy(() => import("../../specific/Search"));
const NotificationsDialog = lazy(() => import("../../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isMobile, isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  const openMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const logoutHandler = async () => {
    let toastId = toast.loading("Logging out...");

    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());

      toast.success(data.message, {
        duration: 1000,
        id: toastId,
      });
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong!", {
        duration: 1000,
        id: toastId,
      });
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#4facfe",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          paddingX: "1rem",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
              cursor: "pointer",
              transition: "color 0.3s",
              "&:hover": { color: "#FFDA79" },
            }}
            onClick={() => navigate("/")}
          >
            Chat App
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={openMobile}>
              {isMobile ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icons Section */}
          <Box display="flex" gap={1}>
            <IconBtn
              title="Search"
              onClick={openSearch}
              icon={<SearchIcon />}
            />
            <IconBtn
              title="New Group"
              onClick={openNewGroup}
              icon={<AddIcon />}
            />
            <IconBtn
              title="Notifications"
              onClick={openNotification}
              icon={<NotificationsIcon />}
            />
            <IconBtn
              title="Manage Groups"
              onClick={() => navigate("/groups")}
              icon={<GroupIcon />}
            />
            <IconBtn
              title="Logout"
              onClick={logoutHandler}
              icon={<LogoutIcon />}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dialogs */}
      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, onClick, icon }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        color="inherit"
        onClick={onClick}
        size="large"
        sx={{
          transition: "transform 0.2s, background-color 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
