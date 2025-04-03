import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import { StyledLink } from "../components/styles/StyledComponents";
import { sampleChats } from "../constants/sampleData";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialog/AddMemberDialog")
);

const isAddMember = true;

const gradientBg = "linear-gradient(to bottom, #4facfe, #00f2fe)";

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [groupName, setGroupName] = useState("Group Name");

  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState();

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);

  const navigateBack = () => navigate("/");

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const openConfirmDeleteHandler = (e) => {
    setConfirmDeleteDialog(true);
    console.log("Delete group", chatId);
  };

  const closeConfirmDeleteHandler = (e) => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = (e) => {
    console.log("Add member to group", chatId);
  };

  const updateGroupName = () => {
    setGroupName(groupName);
    setIsEdit(false);
  };

  const deleteHandler = () => {
    closeConfirmDeleteHandler();
  };

  useEffect(() => {
    setGroupName("Group Name");
    setGroupNameUpdatedValue("Group Name");

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconButtons = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              transform: "scale(1.1)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height="100vh">
      <Grid
        size={{ sm: 4 }}
        sx={{
          display: { xs: "none", sm: "block" },
          background: gradientBg,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1.5rem 2rem",
          background: gradientBg,
          color: "white",
        }}
      >
        {IconButtons}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                xs: "0",
                sm: "1rem",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            ></Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open={true} />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            close={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        slotProps={{
          paper: {
            sx: { width: "60vw", background: gradientBg, padding: "1rem" },
          },
        }}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack sx={{ padding: "1rem" }} width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} key={group._id} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign="center" padding="1rem" color="white">
        No Groups Found
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <StyledLink
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          padding: "0.75rem",
          borderRadius: "0.75rem",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            transform: "scale(1.05)",
          },
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography fontSize="1rem" fontWeight="500" color="white">
          {name}
        </Typography>
      </Stack>
    </StyledLink>
  );
});

export default Groups;
