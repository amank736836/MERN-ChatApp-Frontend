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
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { StyledLink } from "../components/styles/StyledComponents";
import { gradientBg } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useAddMembersMutation,
  useGetChatDetailsQuery,
  useGetMyGroupsQuery,
  useRemoveMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import {
  setIsAddMember,
  setIsDeleteMenu,
  setIsMobile,
} from "../redux/reducers/misc.reducer";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialog/AddMemberDialog")
);

const Groups = () => {
  const { isMobile, isDeleteMenu, isAddMember } = useSelector(
    (state) => state.misc
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chatId = useSearchParams()[0].get("group");

  const [groupName, setGroupName] = useState("Group Details Page");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [members, setMembers] = useState([]);

  const {
    data: myGroups = [],
    isLoading: isLoadingMyGroups,
    isError: isErrorMyGroups,
    error: errorMyGroups,
  } = useGetMyGroupsQuery("");

  const {
    data: groupDetails,
    isLoading: isLoadingGroupDetails,
    isError: isErrorGroupDetails,
    error: errorGroupDetails,
  } = useGetChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });


  const [
    updateGroupNameMutation,
    {
      isLoading: isLoadingUpdateGroupName,
      isError: isErrorUpdateGroupName,
      error: errorUpdateGroupName,
    },
  ] = useAsyncMutation(useRenameGroupMutation);

  const [
    removeMemberMutation,
    {
      isLoading: isLoadingRemoveMember,
      isError: isErrorRemoveMember,
      error: errorRemoveMember,
    },
  ] = useAsyncMutation(useRemoveMemberMutation);

  const [
    addMembersMutation,
    {
      isLoading: isLoadingAddMember,
      isError: isErrorAddMember,
      error: errorAddMember,
    },
  ] = useAsyncMutation(useAddMembersMutation);

  useErrors([
    {
      isError: isErrorMyGroups,
      error: errorMyGroups,
    },
    {
      isError: isErrorGroupDetails,
      error: errorGroupDetails,
    },
    {
      isError: isErrorUpdateGroupName,
      error: errorUpdateGroupName,
    },
    {
      isError: isErrorRemoveMember,
      error: errorRemoveMember,
    },
    {
      isError: isErrorAddMember,
      error: errorAddMember,
    },
  ]);

  const navigateBack = () => navigate("/");
  const handleMobileOpen = () => dispatch(setIsMobile(true));
  const handleMobileClose = () => dispatch(setIsMobile(false));
  const openAddMemberHandler = (e) => dispatch(setIsAddMember(true));
  const openConfirmDeleteHandler = (e) => dispatch(setIsDeleteMenu(true));

  const updateGroupName = () => {
    setIsEdit(false);
    if (groupName === groupNameUpdatedValue) return;
    setGroupName(groupNameUpdatedValue);
    updateGroupNameMutation("Updating group name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const removeMemberHandler = async (memberId) => {
    if (memberId === groupDetails.chat.creator) return;
    removeMemberMutation("Removing member...", {
      chatId,
      memberId,
    });
  };

  useEffect(() => {
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [chatId]);

  useEffect(() => {
    if (groupDetails) {
      setGroupName(groupDetails.chat.name);
      setGroupNameUpdatedValue(groupDetails.chat.name);
      setMembers(
        groupDetails.chat.members.map((member) => ({
          ...member,
          isAdded: true,
        }))
      );
      setIsEdit(false);
    }
    if (isErrorGroupDetails) {
      navigate("/groups");
    }
  }, [groupDetails]);

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
          <IconButton onClick={handleMobileOpen}>
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
      width={"100%"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            variant="outlined"
            width={"80vw"}
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton
            onClick={updateGroupName}
            disabled={isLoadingUpdateGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          {chatId && (
            <IconButton
              onClick={() => setIsEdit(true)}
              disabled={isLoadingUpdateGroupName}
            >
              <EditIcon />
            </IconButton>
          )}
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

  return isLoadingMyGroups ? (
    <LayoutLoader />
  ) : (
    <Grid container height="100vh">
      <Grid
        size={{ sm: 4 }}
        sx={{
          display: { xs: "none", sm: "block" },
          background: gradientBg,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          padding: "0.5rem",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        width={"100%"}
        height={"100%"}
        position={"relative"}
        overflow={"auto"}
      >
        <GroupsList myGroups={myGroups?.groups} chatId={chatId} />
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
              bgcolor={gradientBg}
              height={"50vh"}
              overflow={"auto"}
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {!chatId && (
                <Typography
                  variant="body2"
                  color="white"
                  fontSize={"3rem"}
                  marginLeft={"1rem"}
                  fontWeight={600}
                  sx={{
                    display: "inline-block",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "0.5rem",
                    borderRadius: "1rem",
                  }}
                >
                  Here members can be added or removed from the group. Select a
                  group to view its details.
                </Typography>
              )}
              {groupDetails && members.length === 0 ? (
                <Typography textAlign="center" color="white">
                  No members found in this group.
                </Typography>
              ) : (
                <Stack
                  spacing={0.5}
                  sx={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  <>
                    {isLoadingRemoveMember ? (
                      <>
                        <CircularProgress
                          size={20}
                          sx={{
                            color: "white",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </>
                    ) : (
                      members.map((user) => (
                        <UserItem
                          key={user._id}
                          user={user}
                          isAdded={user.isAdded}
                          handler={removeMemberHandler}
                          styling={{
                            boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
                            padding: "1rem 2rem",
                            borderRadius: "1rem",
                            bgcolor: "rgba(25, 25, 25, 0.5)",
                          }}
                        />
                      ))
                    )}
                  </>
                </Stack>
              )}
            </Stack>

            {chatId && ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {isDeleteMenu && (
        <Suspense fallback={<Backdrop open={true} />}>
          <ConfirmDeleteDialog chatId={chatId} />
        </Suspense>
      )}

      <Drawer
        anchor="left"
        open={isMobile}
        onClose={handleMobileClose}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        slotProps={{
          paper: {
            sx: { width: "75vw", background: gradientBg, padding: "0.5rem" },
          },
        }}
      >
        <GroupsList w={"70vw"} myGroups={myGroups?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack sx={{ padding: "0.25rem" }} width={w} height={"100%"}>
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

  const dispatch = useDispatch();
  const handleMobileClose = () => dispatch(setIsMobile(false));

  return (
    <StyledLink
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
        handleMobileClose();
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem",
          paddingLeft: "1rem",
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
