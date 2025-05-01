import { Drawer, Grid, Skeleton, Stack } from "@mui/material";
import React, { lazy, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gradientBg } from "../../constants/color";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { setIsMobile } from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import Title from "../shared/Title";
import Header from "./Header";

const ChatList = lazy(() => import("../../specific/ChatList"));
const Profile = lazy(() => import("../../specific/Profile"));

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const socket = getSocket();

    const { newMessagesAlert } = useSelector((state) => state.chat);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const { isMobile } = useSelector((state) => state.misc);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const params = useParams();
    const chatId = params.chatId || null;

    const {
      data: chatsData,
      isLoading: isLoadingChats,
      isError: isErrorChats,
      error: errorChats,
      refetch: refetchChats,
    } = useMyChatsQuery("");

    useErrors([
      {
        isError: isErrorChats,
        error: errorChats,
      },
    ]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat", _id, groupChat);
    };

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title title="Chat App" description="This is the chat App" />
        <Header />
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
              chats={chatsData.chats}
              chatId={chatId}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
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
                chats={chatsData.chats}
                chatId={chatId}
                newMessagesAlert={[{ chatId, count: 2 }]}
                onlineUsers={["1", "2"]}
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
