import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../constants/sampleData";

const Notifications = ({ close }) => {
  const friendRequestHandler = ({ _id, accept }) => {};

  return (
    <Dialog open onClose={close}>
      <Box
        sx={{
          p: "2rem",
          width: "28rem",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DialogTitle
          textAlign="center"
          fontWeight={600}
          color="#333"
          sx={{ pb: 2 }}
        >
          Notifications
        </DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((notification) => (
            <NotificationItem
              sender={notification.sender}
              _id={notification._id}
              handler={friendRequestHandler}
              key={notification._id}
            />
          ))
        ) : (
          <Typography textAlign="center" color="gray">
            No Notifications yet
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
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
      <Avatar src={avatar} sx={{ width: 50, height: 50 }} />

      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ml: "1rem",
        }}
      >
        {name} sent you a friend request
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
          onClick={() => handler({ _id, accept: true })}
          variant="contained"
          color="success"
          size="small"
        >
          Accept
        </Button>
        <Button
          onClick={() => handler({ _id, accept: false })}
          variant="contained"
          color="error"
          size="small"
        >
          Reject
        </Button>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
