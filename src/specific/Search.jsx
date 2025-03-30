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

const Search = () => {
  const search = useInputValidation("");

  const [isLoadingSendFrindRequest, setIsLoadingSendFrindRequest] =
    useState(false);

  const sendFriendRequestHandler = async (userId) => {};

  const [users, setUsers] = useState(sampleUsers);

  return (
    <Dialog open>
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
              handlerIsLoading={isLoadingSendFrindRequest}
              handler={sendFriendRequestHandler}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
