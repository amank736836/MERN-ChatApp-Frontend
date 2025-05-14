import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { lightBlue } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { useSendFriendRequestMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";

const MessageComponent = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const { sender, content, attachments = [], createdAt } = message;

  const isSender = sender._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  const [
    sendFriendRequest,
    {
      isLoading: isLoadingSendFriendRequest,
      isError: sendFriendRequestError,
      error: sendFriendRequestErrorData,
    },
  ] = useAsyncMutation(useSendFriendRequestMutation);

  useErrors([
    {
      isError: sendFriendRequestError,
      error: sendFriendRequestErrorData,
    },
  ]);

  const sendFriendRequestHandler = async (userId) => {
    if (!userId) return;
    await sendFriendRequest("Sending friend request...", userId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isSender ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{
        alignSelf: isSender ? "flex-end" : "flex-start",
        color: isSender ? "white" : "black",
        backgroundColor: isSender ? "blue" : "lightgray",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!isSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name ? sender.name : "Anonymous"}
        </Typography>
      )}

      {!isSender && message.chat === user._id && (
        <Button
          onClick={() => sendFriendRequestHandler(sender._id)}
          disabled={isLoadingSendFriendRequest}
          variant="outlined"
          size="small"
          sx={{
            marginLeft: "0.5rem",
            color: lightBlue,
            borderColor: lightBlue,
          }}
        >
          {isLoadingSendFriendRequest ? "Sending..." : "Add Friend"}
        </Button>
      )}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const fileType = fileFormat(url);
          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: isSender ? "white" : "black",
                }}
              >
                {RenderAttachment(fileType, url)}
              </a>
            </Box>
          );
        })}

      {content && <Typography>{content}</Typography>}

      <Typography variant="caption" color={isSender ? "white" : "black"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
