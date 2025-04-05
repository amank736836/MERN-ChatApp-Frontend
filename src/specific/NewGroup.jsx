import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../components/shared/UserItem";
import { sampleUsers } from "../constants/sampleData";
import { usernameValidator } from "../utils/validators";
import { dialogBg } from "../constants/color";

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

  return (
    <Dialog open onClose={close}>
      <Box
        sx={{
          p: { xs: "1.5rem", sm: "3rem" },
          width: "30rem",
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
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={Boolean(user.isAdded)}
            />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={close}
            sx={{ borderRadius: "8px", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={groupName.error}
            sx={{
              bgcolor: "#28a745",
              "&:hover": { bgcolor: "#218838" },
              "&:disabled": { bgcolor: "#d3d3d3", color: "#777" },
              borderRadius: "8px",
              fontWeight: 600,
            }}
            onClick={submitHandler}
          >
            Create Group
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default NewGroup;
