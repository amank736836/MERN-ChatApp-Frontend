import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dialogBg } from "../../constants/color";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddMembersMutation,
  useGetAvailableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc.reducer";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const { isAddMember } = useSelector((state) => state.misc);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const {
    data: availableFriends,
    isLoading: isLoadingAvailableFriends,
    isError: isErrorAvailableFriends,
    error: errorAvailableFriends,
  } = useGetAvailableFriendsQuery(chatId);

  const [
    addMembers,
    {
      isLoading: isLoadingAddMember,
      isError: isErrorAddMember,
      error: errorAddMember,
    },
  ] = useAsyncMutation(useAddMembersMutation);

  useErrors([
    { isError: isErrorAddMember, error: errorAddMember },
    { isError: isErrorAvailableFriends, error: errorAvailableFriends },
  ]);

  const addMembersSubmitHandler = () => {
    addMembers("Adding Members...", {
      chatId,
      members: selectedMembers,
    });
    closeHandler();
  };

  const closeHandler = () => {
    setSelectedMembers([]);
    dispatch(setIsAddMember(false));
  };

  const selectMemberHandler = (userId) => {
    if (!userId) return;
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Box
        sx={{
          p: "1rem",
          width: {
            xs: "80vw",
            sm: "70vw",
            md: "50vw",
            lg: "30vw",
          },
          height: "auto",
          background: dialogBg,
        }}
      >
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          <List
            key={"AddMemberList"}
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              borderRadius: "8px",
              backgroundColor: "white",
              p: "0.5rem",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {isLoadingAvailableFriends ? (
              <Skeleton
                key={"AddMemberSkeleton"}
                variant="rectangular"
                width={"100%"}
                height={100}
                animation="wave"
                sx={{
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                }}
              />
            ) : isErrorAvailableFriends ? (
              <Typography textAlign={"center"} key={"AddMemberError"}>
                {errorAvailableFriends?.data?.message ||
                  errorAvailableFriends?.message ||
                  "Something went wrong"}
              </Typography>
            ) : availableFriends?.friends?.length > 0 ? (
              availableFriends?.friends?.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={Boolean(selectedMembers?.includes(user._id))}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Known Found</Typography>
            )}
          </List>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          paddingTop={2}
          marginTop={2}
        >
          <Button color="error" variant="contained" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={addMembersSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddMemberDialog;
