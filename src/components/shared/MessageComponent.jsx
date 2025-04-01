import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const isSender = sender._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
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
          {sender.name}
        </Typography>
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
    </div>
  );
};

export default memo(MessageComponent);
