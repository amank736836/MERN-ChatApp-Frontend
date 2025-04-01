import React, { Fragment, useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor, orange } from "../constants/color";
import { IconButton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialog/FileMenu";
import { sampleMessages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "sdmndnsad",
  name: "John Doe",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          // "&::-webkit-scrollbar": {
          //   width: "8px",
          //   backgroundColor: grayColor,
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "#888",
          //   borderRadius: "4px",
          // },
          // "&::-webkit-scrollbar-thumb:hover": {
          //   backgroundColor: "#555",
          // },
        }}
      >
        {sampleMessages.map((message, index) => (
          <MessageComponent message={message} key={index} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type a message..." />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.4rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
