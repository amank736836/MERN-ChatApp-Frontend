import React from "react";
import Header from "./Header";
import { Grid } from "@mui/material";
import Title from "../shared/Title";
import ChatList from "../../specific/ChatList";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title title="Chatu App" description="This is the chat App" />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            bgcolor="primary.main"
          >
            <ChatList chats={[1, 2, 3, 4, 5, 6, 7, 8]} chatId={1} />
          </Grid>
          <Grid
            size={{ sm: 8, md: 5, lg: 6, xs: 12 }}
            height={"100%"}
            bgcolor="secondary.main"
          >
            Main Content
          </Grid>
          <Grid
            size={{ md: 4, lg: 3 }}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0, 0, 0, 0.85)",
            }}
            height={"100%"}
          >
            Right Sidebar
          </Grid>
        </Grid>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default AppLayout;
