import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
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
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../../specific/Search"));
const NotificationsDialog = lazy(() => import("../../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    setIsSearch(false);
    setIsNewGroup(false);
    setIsNotification(false);
  };

  const toggleSearch = () => {
    setIsSearch((prev) => !prev);
    setIsNewGroup(false);
    setIsNotification(false);
  };

  const toggleNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    setIsSearch(false);
    setIsNotification(false);
  };

  const toggleNotification = () => {
    setIsNotification((prev) => !prev);
    setIsSearch(false);
    setIsNewGroup(false);
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
            <IconButton color="inherit" onClick={handleMobile}>
              {isMobile ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icons Section */}
          <Box display="flex" gap={1}>
            <IconBtn
              title="Search"
              onClick={toggleSearch}
              icon={<SearchIcon />}
            />
            <IconBtn
              title="New Group"
              onClick={toggleNewGroup}
              icon={<AddIcon />}
            />
            <IconBtn
              title="Notifications"
              onClick={toggleNotification}
              icon={<NotificationsIcon />}
            />
            <IconBtn
              title="Manage Groups"
              onClick={() => navigate("/groups")}
              icon={<GroupIcon />}
            />
            <IconBtn title="Logout" onClick={() => {}} icon={<LogoutIcon />} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dialogs */}
      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog close={toggleSearch} />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog close={toggleNewGroup} />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog close={toggleNotification} />
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
