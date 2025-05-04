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
import { useNavigate } from "react-router-dom";
import FileMenu from "../components/dialog/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat.reducer";
import { setIsFileMenu } from "../redux/reducers/misc.reducer";
import { getSocket } from "../socket";

const Chat = ({ chatId }) => {
  const { user } = useSelector((state) => state.auth);
  const { uploadingLoader } = useSelector((state) => state.misc);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [MeTyping, setMeTyping] = useState(false);
  const [userNameTyping, setUserNameTyping] = useState(null);

  const typingTimeout = useRef(null);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };
  const socket = getSocket();

  const {
    data: chatDetails,
    isLoading: isLoadingChatDetails,
    isError: isErrorChatDetails,
    error: errorChatDetails,
  } = useGetChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

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

  const chatMembers = chatDetails?.chat.members || [];

  const members = chatDetails?.chat.members.map((member) => member._id) || [];

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, {
      message,
      chatId,
      members,
    });
    socket.emit(STOP_TYPING, {
      members,
      chatId,
      senderId: user._id,
    });
    setMessage("");
  };

  const alertHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: Date.now(),
          name: "System",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, messageForAlert]);
    },
    [chatId]
  );

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prevMessages) => [...prevMessages, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const { senderId } = data;
      const member = chatMembers?.find((member) => member._id === senderId);
      if (member) {
        setUserNameTyping(member.name);
      }
    },
    [chatId, chatMembers]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const { senderId } = data;
      const member = chatMembers?.find((member) => member._id === senderId);
      if (member) {
        setUserNameTyping(null);
      }
    },
    [chatId, chatMembers]
  );

  const eventHandler = {
    [ALERT]: alertHandler,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    socket.emit(CHAT_JOINED, {
      chatId,
      userId: user._id,
      members,
    });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setPage(1);
      setOldMessages([]);
      setMessage("");
      socket.emit(CHAT_LEAVED, {
        chatId,
        userId: user._id,
        members,
      });
    };
  }, [chatId]);

  useEffect(() => {
    if (isErrorOldMessages || isErrorChatDetails) {
      navigate("/");
    }
  }, [isErrorOldMessages, isErrorChatDetails]);

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
        {allMessages.length === 0 ? (
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={"1rem"}
          >
            <h1
              style={{
                fontSize: "2rem",
                color: "black",
              }}
            >
              No Messages Yet
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              Start the conversation
            </h2>
          </Stack>
        ) : (
          <>
            {allMessages.map((message) => (
              <MessageComponent
                message={message}
                key={message._id}
                user={user}
              />
            ))}
          </>
        )}
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
