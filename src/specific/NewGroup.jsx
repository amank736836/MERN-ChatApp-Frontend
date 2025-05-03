import { useInputValidation } from "6pp";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { dialogBg } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useGetAvailableFriendsQuery,
  useNewGroupMutation,
} from "../redux/api/api";
import { setIsNewGroup } from "../redux/reducers/misc.reducer";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);

  const groupName = useInputValidation("");

  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const {
    data: availableFriends,
    isLoading: loadingAvailableFriends,
    isError: errorAvailableFriends,
    error: errorAvailableFriendsMessage,
  } = useGetAvailableFriendsQuery("");

  const [
    newGroup,
    {
      isLoading: loadingNewGroup,
      isError: errorNewGroup,
      error: errorNewGroupMessage,
    },
  ] = useAsyncMutation(useNewGroupMutation);

  useErrors([
    {
      isError: errorAvailableFriends,
      error: errorAvailableFriendsMessage,
    },
    {
      isError: errorNewGroup,
      error: errorNewGroupMessage,
    },
  ]);

  const closeGroupHandler = () => {
    setSelectedMembers([]);
    dispatch(setIsNewGroup(false));
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 1) {
      return toast.error("Select at least one member");
    }

    newGroup("Creating new group...", {
      name: groupName.value,
      otherMembers: selectedMembers,
    });

    closeGroupHandler();
  };

  const selectMemberHandler = (userId) => {
    if (!userId) return;
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    setMembers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, isAdded: !user.isAdded } : user
      )
    );
  };

  useEffect(() => {
    if (availableFriends?.friends?.length > 0) {
      setMembers(
        availableFriends.friends?.map((user) => ({ ...user, isAdded: false }))
      );
    }
  }, [availableFriends]);

  useEffect(() => {
    setMembers((prev) => prev.map((user) => ({ ...user, isAdded: false })));
    setSelectedMembers([]);
  }, []);

  return (
    <Dialog open={isNewGroup} onClose={closeGroupHandler}>
      <Box
        sx={{
          p: { xs: "1.5rem", sm: "3rem" },
          width: {
            xs: "80vw",
            sm: "70vw",
            md: "50vw",
            lg: "30vw",
          },
          borderRadius: "12px",
          background: dialogBg,
        }}
      >
        <DialogTitle textAlign="center" variant="h4" fontWeight={600}>
          Create a New Group
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          size="medium"
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "8px",
          }}
        />

        <Typography variant="body1" fontWeight={500} mt={2}>
          Select members to add to the group:
        </Typography>

        <Stack
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            borderRadius: "8px",
            backgroundColor: "white",
            p: "0.5rem",
            mt: "1rem",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {loadingAvailableFriends ? (
            <Skeleton variant="rounded" height={40} />
          ) : errorAvailableFriends ? (
            <Typography variant="body2" color="error" textAlign="center">
              {errorAvailableFriendsMessage}
            </Typography>
          ) : availableFriends?.friends?.length === 0 ? (
            <Typography variant="body2" textAlign="center">
              No available friends to add.
            </Typography>
          ) : (
            members.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={Boolean(user.isAdded)}
              />
            ))
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={closeGroupHandler}
            sx={{ borderRadius: "8px", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              bgcolor: "#28a745",
              "&:hover": { bgcolor: "#218838" },
              "&:disabled": { bgcolor: "#d3d3d3", color: "#777" },
              borderRadius: "8px",
              fontWeight: 600,
            }}
            onClick={submitHandler}
            disabled={groupName.value.length < 1 || selectedMembers.length < 1}
          >
            Create Group
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default NewGroup;
