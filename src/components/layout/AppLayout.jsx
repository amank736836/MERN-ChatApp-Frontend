import { Grid } from "@mui/material";
import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import Title from "../shared/Title";
import Header from "./Header";

const ChatList = lazy(() => import("../../specific/ChatList"));
const Profile = lazy(() => import("../../specific/Profile"));

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId || "1";

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat", _id, groupChat);
    };

    return (
      <>
        <Title title="Chat App" description="This is the chat App" />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              background: "linear-gradient(to bottom, #4facfe, #00f2fe)",
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              newMessagesAlert={[{ chatId, count: 2 }]}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid
            size={{ sm: 8, md: 5, lg: 6, xs: 12 }}
            height={"100%"}
            bgcolor="secondary.main"
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            size={{ md: 4, lg: 3 }}
            sx={{
              display: { xs: "none", md: "block" },
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
