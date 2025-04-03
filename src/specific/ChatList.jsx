import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../components/shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      height={"100%"}
      width={w}
      direction={"column"}
      spacing={2}
      sx={{
        p: 2,
        background: "linear-gradient(to bottom, #4facfe, #00f2fe)",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      overflow={"auto"}
    >
      {chats.map((data, index) => {
        const { _id, avatar, name, groupChat, members = [] } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some(({ member }) =>
          onlineUsers.includes(_id)
        );

        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={_id === chatId}
            index={index}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
