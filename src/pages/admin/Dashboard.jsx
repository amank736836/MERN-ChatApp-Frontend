import { AdminPanelSettings as AdminPanelSettingsIcon } from "@mui/icons-material";
import { Container, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { SearchField } from "../../components/styles/StyledComponents";

const Dashboard = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Appbar = (
    <Paper
      elevation={6}
      sx={{
        padding: {
          xs: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
          lg: "1.75rem",
        },
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems="center"
        width={"100%"}
      >
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />

        <SearchField
          placeholder="Search..."
          sx={{
            width: "100%",
          }}
        />
      </Stack>
      <Stack alignItems={"center"} marginTop={"1rem"}>
        <Typography>{time.format("Do MMMM YYYY h:mm:ss a")}</Typography>
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>{Appbar}</Container>
    </AdminLayout>
  );
};

export default Dashboard;
