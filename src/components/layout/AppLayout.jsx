import { Drawer, Grid, Skeleton, Stack } from "@mui/material";
import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gradientBg } from "../../constants/color";
import { useErrors } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsMobile } from "../../redux/reducers/misc";
import Title from "../shared/Title";
import Header from "./Header";

const ChatList = lazy(() => import("../../specific/ChatList"));
const Profile = lazy(() => import("../../specific/Profile"));

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();

    const params = useParams();
    const chatId = params.chatId || "1";

    const { isMobile } = useSelector((state) => state.misc);

    const { user } = useSelector((state) => state.auth);

    const {
      data: chatsData,
      isLoading: isLoadingChats,
      isError: isErrorChats,
      error: errorChats,
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

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

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
                width: "70vw",
                background: gradientBg,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={handleMobileClose}
          >
            <ChatList
              w="70vw"
              chats={chatsData.chats}
              chatId={chatId}
              newMessagesAlert={[{ chatId, count: 2 }]}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
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
            <WrappedComponent {...props} />
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
