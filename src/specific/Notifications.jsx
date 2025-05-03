import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dialogBg } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { transformImageUrl } from "../lib/features";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../redux/api/api";
import { setIsNotification } from "../redux/reducers/misc.reducer";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const [notification, setNotification] = useState([]);

  const dispatch = useDispatch();

  const [
    acceptFriendRequest,
    {
      data: acceptFriendRequestData,
      isLoading: isLoadingAcceptFriendRequest,
      isError: isErrorAcceptFriendRequest,
      error: errorAcceptFriendRequest,
    },
  ] = useAsyncMutation(useAcceptFriendRequestMutation);

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications,
  } = useGetNotificationsQuery();

  useErrors([
    {
      isError: isErrorNotifications,
      error: errorNotifications,
    },
    {
      isError: isErrorAcceptFriendRequest,
      error: errorAcceptFriendRequest,
    },
  ]);

  const closeNotification = () => {
    dispatch(setIsNotification(false));
  };

  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptFriendRequest("Accepting Friend Request...", {
      requestId: _id,
      accept,
    });
  };

  useEffect(() => {
    if (acceptFriendRequestData?.success) {
      setNotification((prev) =>
        prev.filter(
          (notification) =>
            notification._id !== acceptFriendRequestData.senderId
        )
      );
    }
  }, [acceptFriendRequestData]);

  useEffect(() => {
    if (notificationsData) {
      setNotification(notificationsData.allRequests);
    }
  }, [notificationsData]);

  return (
    <Dialog open={isNotification} onClose={closeNotification}>
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
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          overflow: "auto",
        }}
      >
        <DialogTitle
          textAlign="center"
          fontWeight={600}
          color="#333"
          sx={{ pb: 2 }}
        >
          Friendship Requests
        </DialogTitle>

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
          {isLoadingNotifications ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={100}
              sx={{
                borderRadius: "8px",
                mb: "0.5rem",
                background:
                  "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                animation: "loading 1.5s infinite",
              }}
            />
          ) : notification.length > 0 ? (
            notificationsData.allRequests.map((notification) => (
              <NotificationItem
                sender={notification.sender}
                _id={notification._id}
                handler={friendRequestHandler}
                key={notification._id}
              />
            ))
          ) : (
            <Typography textAlign="center" color="gray">
              {notification.length === 0
                ? "No Notifications yet"
                : "Error fetching notifications"}
            </Typography>
          )}
        </List>
      </Box>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          p: "1rem",
          mb: "0.5rem",
        }}
      >
        <Avatar
          src={transformImageUrl(avatar)}
          sx={{ width: 50, height: 50 }}
        />
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "auto",
              textOverflow: "ellipsis",
              ml: "1rem",
            }}
          >
            {name}
          </Typography>
          <Stack spacing={1} direction={"row"} justifyContent="center">
            <Button
              onClick={() => handler({ _id, accept: true })}
              variant="contained"
              color="success"
              size="small"
            >
              Accept
            </Button>
            <Button
              onClick={() =>
                handler({
                  _id,
                  accept: false,
                })
              }
              variant="contained"
              color="error"
              size="small"
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default Notifications;
