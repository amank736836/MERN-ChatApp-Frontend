import { Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = (id) => {
    addMember(id, chatId);
  };
  return (
    <Dialog open>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle
        textAlign={"center"}
        >Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((user) => (
              <UserItem user={user} key={user.id} handler={addFriendHandler} />
            ))
          ) : (
            <Typography textAlign={"center"}>No Known Found</Typography>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
