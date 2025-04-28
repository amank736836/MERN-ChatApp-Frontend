import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileMenu from "../components/dialog/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import { NEW_MESSAGE } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";

const Chat = ({ chatId }) => {
  const { user } = useSelector((state) => state.auth);
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const {
    data: chatDetails,
    isLoading: isLoadingChatDetails,
    isError: isErrorChatDetails,
    error: errorChatDetails,
  } = useGetChatDetailsQuery({
    chatId,
    skip: !chatId,
    populate: false,
  });

  const {
    data: oldMessagesChunks,
    isLoading: isLoadingMessages,
    isError: isErrorOldMessages,
    error: errorOldMessages,
  } = useGetMessagesQuery({
    chatId,
    page,
    skip: !chatId,
  });

  useErrors([
    {
      isError: isErrorChatDetails,
      error: errorChatDetails,
    },
    {
      isError: isErrorOldMessages,
      error: errorOldMessages,
    },
  ]);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunks?.totalPages,
    page,
    setPage,
    oldMessagesChunks?.messages
  );

  const allMessages = [...oldMessages, ...messages];

  const members = chatDetails?.chat.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, {
      message,
      chatId,
      members,
    });
    setMessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    console.log("New message received", data);
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, data.message];
      if (containerRef.current) {
        containerRef.current.scrollTop =
          containerRef.current.scrollHeight - containerRef.current.clientHeight;
      }
      return newMessages;
    });
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventHandler);

  // useEffect(() => {
  //   socket.on(NEW_MESSAGE, newMessagesHandler);
  //   return () => {
  //     socket.off(NEW_MESSAGE, newMessagesHandler);
  //   };
  // }, [socket]);

  const handleFileOpen = () => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  return isLoadingChatDetails ? (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: grayColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </Stack>
  ) : (
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {allMessages.map((message, index) => (
          <MessageComponent message={message} key={index} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
        >
          <IconButton
            onClick={handleFileOpen}
            sx={{
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

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

      <FileMenu anchorE1={fileMenuAnchor} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
