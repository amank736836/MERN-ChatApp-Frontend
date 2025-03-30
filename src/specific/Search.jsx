import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../components/shared/UserItem";
import { sampleUsers } from "../constants/sampleData";

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
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find a friend or group</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          varient="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handlerIsLoading={isLoadingSendFriendRequest}
              handler={sendFriendRequestHandler}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
