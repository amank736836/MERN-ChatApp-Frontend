import { Drawer, Grid, Skeleton, Stack } from "@mui/material";
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { gradientBg } from "../../constants/color";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/features";
import { useGetMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux/reducers/chat.reducer";
import {
  setIsDeleteMenu,
  setIsMobile,
  setIsProfile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc.reducer";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialog/DeleteChatMenu";
import Header from "./Header";

const ChatList = lazy(() => import("../../specific/ChatList"));
const Profile = lazy(() => import("../../specific/Profile"));

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const { isMobile, isProfile } = useSelector((state) => state.misc);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const handleProfileClose = () => {
      dispatch(setIsProfile(false));
    };

    const params = useParams();
    const chatId = params.chatId || null;
    const deleteOptionAnchor = useRef(null);

    const socket = getSocket();

    const {
      data: chatsData,
      isLoading: isLoadingChats,
      isError: isErrorChats,
      error: errorChats,
      refetch: refetchChats,
    } = useGetMyChatsQuery("");

    useErrors([
      {
        isError: isErrorChats,
        error: errorChats,
      },
    ]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault();
      deleteOptionAnchor.current = e.currentTarget;
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
    };

    const newMessagesAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const refetchChatsListener = useCallback(
      (data) => {
        if (data) {
          toast.success(data, {
            duration: 1000,
          });
        }
        refetchChats();
        navigate("/");
      },
      [refetchChats]
    );

    const onlineUsersListener = useCallback(
      (data) => {
        setOnlineUsers(data.onlineUsers);
      },
      [dispatch]
    );

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchChatsListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    return (
      <>
        <title>MERN Chat App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="MERN Chat App" />
        <meta name="keywords" content="MERN, Chat, App" />
        <meta name="author" content="Aman Kumar" />
        <Header />
        <DeleteChatMenu
          deleteOptionAnchor={deleteOptionAnchor}
          handleDeleteChat={handleDeleteChat}
        />
        {isLoadingChats ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobile}
            onClose={handleMobileClose}
            anchor="right"
            sx={{
              "& .MuiDrawer-paper": {
                width: "80vw",
                background: gradientBg,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={handleMobileClose}
          >
            <ChatList
              w="80vw"
              chats={chatsData?.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        {isLoadingChats ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isProfile}
            onClose={handleProfileClose}
            anchor="left"
            sx={{
              "& .MuiDrawer-paper": {
                width: {
                  xs: "85vw",
                  sm: "75vw",
                  md: "42vw",
                },
                background: gradientBg,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Profile />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            size={{ sm: 4, md: 5, lg: 3 }}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              background: gradientBg,
            }}
            height={"100%"}
          >
            {isLoadingChats ? (
              <Stack spacing={"1rem"}>
                {Array.from({ length: 8 }, (_, index) => (
                  <Skeleton key={index} variant="rounded" height={95} sx={{}} />
                ))}
              </Stack>
            ) : (
              <ChatList
                chats={chatsData?.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid size={{ sm: 8, md: 7, lg: 6, xs: 12 }} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} />
          </Grid>
          <Grid
            size={{ lg: 3 }}
            sx={{
              display: { xs: "none", lg: "block" },
              // padding: "2rem",
              // bgcolor: "rgba(0, 0, 0, 0.85)",
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
