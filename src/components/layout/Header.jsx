import {
  Add as AddIcon,
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
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
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

  const openSearch = () => {
    setIsSearch((prev) => !prev);
    setIsNewGroup(false);
    setIsNotification(false);
    setIsMobile(false);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    setIsSearch(false);
    setIsNotification(false);
    setIsMobile(false);
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
    setIsSearch(false);
    setIsNewGroup(false);
    setIsMobile(false);
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = () => {};

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chat App
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                onClick={openSearch}
                icon={<SearchIcon />}
              />
              <IconBtn
                title={"New Group"}
                onClick={openNewGroup}
                icon={<AddIcon />}
              />

              <IconBtn
                title={"Notifications"}
                onClick={openNotification}
                icon={<NotificationsIcon />}
              />

              <IconBtn
                title={"Manage Groups"}
                onClick={navigateToGroup}
                icon={<GroupIcon />}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog close={openNewGroup} />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog close={openNotification} />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, onClick, icon }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton color="inherit" onClick={onClick} size="large">
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
