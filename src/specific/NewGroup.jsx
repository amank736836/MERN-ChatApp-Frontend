import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import { useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";

const NewGroup = ({ close }) => {
  const groupName = useInputValidation("", usernameValidator);

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

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

  const submitHandler = () => {};

  useEffect(() => {
    setMembers((prev) => prev.map((user) => ({ ...user, isAdded: false })));
    setSelectedMembers([]);
  }, []);

  console.log(members);

  return (
    <Dialog open onClose={close}>
      <Stack
        p={{
          xs: "1rem",
          sm: "3rem",
        }}
        width={"25rem"}
        spacing={"1rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          Create a new group
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          size="small"
        />

        <Typography variant="body1">
          Select members to add to the group
        </Typography>

        <Stack>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={groupName.error}
            sx={{
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.dark",
              },
              "&:disabled": {
                bgcolor: "darkorchid",
                color: "white",
              },
            }}
            onClick={submitHandler}
          >
            Create Group
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
