import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
  Box,
  List,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../constants/sampleData";
import { transformImageUrl } from "../lib/features";
import { dialogBg } from "../constants/color";

const Notifications = ({ close }) => {
  const friendRequestHandler = ({ _id, accept }) => {};

  return (
    <Dialog open onClose={close}>
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
          Notifications
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
        <Stack direction={"column"} alignItems={"center"} width={"100%"}>
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
              onClick={() => handler({ _id, accept: false })}
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
