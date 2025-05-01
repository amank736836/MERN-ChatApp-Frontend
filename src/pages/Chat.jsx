import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import FileMenu from "../components/dialog/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";

const Chat = ({ chatId }) => {
  const { user } = useSelector((state) => state.auth);
  const { uploadingLoader } = useSelector((state) => state.misc);

  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [MeTyping, setMeTyping] = useState(false);
  const [userNameTyping, setUserNameTyping] = useState(null);

  const typingTimeout = useRef(null);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const {
    data: chatDetails,
    isLoading: isLoadingChatDetails,
    isError: isErrorChatDetails,
    error: errorChatDetails,
  } = useGetChatDetailsQuery({
    chatId,
    skip: !chatId,
    populate: true,
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

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!MeTyping) {
      socket.emit(START_TYPING, {
        members,
        chatId,
        senderId: user._id,
      });
      setMeTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setMeTyping(false);
      socket.emit(STOP_TYPING, {
        members,
        chatId,
        senderId: user._id,
      });
    }, 2000);
  };

  const alertHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "system",
          name: "System",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, messageForAlert]);
    },
    [chatId]
  );

  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prevMessages) => [...prevMessages, data.message]);
    },
    [chatId]
  );

  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const { senderId } = data;
      const member = members?.find((member) => member._id === senderId);
      if (member) {
        console.log(`${member.name} is typing...`);
        setUserNameTyping(member.name);
      }
    },
    [chatId]
  );

  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const { senderId } = data;
      const member = members?.find((member) => member._id === senderId);
      if (member) {
        console.log(`${member.name} stopped typing...`);
        setUserNameTyping(null);
      }
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertHandler,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
  };

  useSocketEvents(socket, eventHandler);

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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setPage(1);
      setOldMessages([]);
      setMessage("");
    };
  }, [chatId]);

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
          <MessageComponent message={message} key={message._id} user={user} />
        ))}
        {userNameTyping && <TypingLoader username={userNameTyping} />}
        <div ref={bottomRef} />
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
            disabled={uploadingLoader}
            sx={{
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type a message..."
            value={message}
            onChange={messageChangeHandler}
            sx={{
              padding: "1rem",
              borderRadius: "250px",
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

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
