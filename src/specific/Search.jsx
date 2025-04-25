import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { dialogBg } from "../constants/color";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../redux/api/api";
import { setIsSearch } from "../redux/reducers/misc";
import { useAsyncMutation } from "../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const search = useInputValidation("");

  const [searchUser, { isLoading: isLoadingSearchUser, error }] =
    useLazySearchUserQuery(search.value);

  const [
    sendFriendRequest,
    {
      isLoading: isLoadingSendFriendRequest,
      isError: sendFriendRequestError,
      error: sendFriendRequestErrorData,
    },
  ] = useAsyncMutation(useSendFriendRequestMutation);

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const closeSearch = () => {
    dispatch(setIsSearch(false));
  };

  const sendFriendRequestHandler = async (userId) => {
    if (!userId) return;
    await sendFriendRequest("Sending friend request...", userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      try {
        searchUser(search.value).then((res) => {
          console.log(res.data.users);
          setUsers(res.data.users);
        });
      } catch (error) {
        console.error(error);
        toast.error("Error fetching users");
      }
    }, 300);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog open={isSearch} onClose={closeSearch}>
      <Box
        sx={{
          p: "1rem",
          width: {
            xs: "80vw",
            sm: "70vw",
            md: "50vw",
            lg: "30vw",
          },
          background: dialogBg,
        }}
      >
        <DialogTitle
          textAlign="center"
          fontWeight={600}
          color="#333"
          sx={{ pb: 2 }}
        >
          Find a Friend
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
          key={"SearchList"}
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
          {isLoadingSearchUser ? (
            <Box
              key={"loadingUsers"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                animation="wave"
                sx={{ borderRadius: "8px" }}
              />
            </Box>
          ) : error ? (
            <Box
              key={"errorFetchingUsers"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <p style={{ color: "#f00" }}>Error fetching users</p>
            </Box>
          ) : users.length === 0 ? (
            <Box
              key={"noUsersFound"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <p style={{ color: "#555" }}>No users found</p>
            </Box>
          ) : (
            users.map((user) => (
              <UserItem
                user={user}
                key={user.id}
                handler={sendFriendRequestHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          )}
        </List>
      </Box>
    </Dialog>
  );
};

export default Search;
