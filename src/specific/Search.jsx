import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../components/shared/UserItem";
import { sampleUsers } from "../constants/sampleData";
import { dialogBg } from "../constants/color";

const Search = ({ close }) => {
  const search = useInputValidation("");

  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] =
    useState(false);

  const [users, setUsers] = useState(sampleUsers);

  const sendFriendRequestHandler = async (userId) => {
    if (!userId) return;
    setIsLoadingSendFriendRequest(true);
    try {
      // await sendFriendRequest(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSendFriendRequest(false);
    }
  };

  return (
    <Dialog open onClose={close}>
      <Box
        sx={{
          p: "2rem",
          width: "28rem",
          background: dialogBg,
        }}
      >
        <DialogTitle
          textAlign="center"
          fontWeight={600}
          color="#333"
          sx={{ pb: 2 }}
        >
          Find a Friend or Group
        </DialogTitle>
        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="medium"
          placeholder="Search for friends or groups..."
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "8px",
            mb: 2,
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#555" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <List
          sx={{
            maxHeight: "300px",
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
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handlerIsLoading={isLoadingSendFriendRequest}
              handler={sendFriendRequestHandler}
            />
          ))}
        </List>
      </Box>
    </Dialog>
  );
};

export default Search;
