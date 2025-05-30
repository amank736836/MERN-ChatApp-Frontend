import {
  AccountCircle as AccountCircleIcon,
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
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth.reducer";
import { resetNotificationCount } from "../../redux/reducers/chat.reducer";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsProfile,
  setIsSearch,
} from "../../redux/reducers/misc.reducer";

const SearchDialog = lazy(() => import("../../specific/Search"));
const NotificationsDialog = lazy(() => import("../../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isMobile, isSearch, isNotification, isNewGroup, isProfile } =
    useSelector((state) => state.misc);

  const { notificationCount } = useSelector((state) => state.chat);

  const openMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openProfile = () => {
    dispatch(setIsProfile(true));
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
          // paddingX: "1rem",
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
              value={notificationCount}
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

          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <IconBtn
              title="Profile"
              onClick={openProfile}
              icon={<AccountCircleIcon />}
            />
          </Box>
        </Toolbar>
      </AppBar>

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

const IconBtn = ({ title, onClick, icon, value }) => {
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
        {value ? (
          <Badge color="error" badgeContent={value}>
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
