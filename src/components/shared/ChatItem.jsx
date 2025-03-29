import React from "react";
import { Link } from "react-router-dom";

const ChatItem = ({
  avatar = [],
  name = "",
  _id = "",
  groupChat = false,
  sameSender = false,
  isOnline = false,
  newMessage = 0,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return <Link to={"/"}></Link>;
};

export default ChatItem;
