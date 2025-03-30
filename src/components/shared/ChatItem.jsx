import React, { memo } from "react";
import { StyledLink } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name = "",
  _id = "",
  groupChat = false,
  sameSender = false,
  isOnline = false,
  newMessageAlert = 2,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <StyledLink
      sx={{
        padding: "0",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          borderRadius: "12px",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Messages</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              borderRadius: "50%",
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </StyledLink>
  );
};

export default memo(ChatItem);
