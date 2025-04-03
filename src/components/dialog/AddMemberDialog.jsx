import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const addMemberSubmitHandler = () => {
    closeHandler();
  };

  const closeHandler = () => {
    setMembers(sampleUsers);
    setSelectedMembers([]);
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
    setMembers((prev) => prev.map((user) => ({ ...user, isAdded: false })));
    setSelectedMembers([]);
  }, []);

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((user) => (
              <UserItem
                user={user}
                key={user.id}
                handler={selectMemberHandler}
                isAdded={Boolean(user.isAdded)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Known Found</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Button color="error" variant="contained" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
