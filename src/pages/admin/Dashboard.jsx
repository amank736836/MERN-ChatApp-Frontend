import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Container, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { useErrors } from "../../hooks/hook";
import { useGetDashboardStatsQuery } from "../../redux/api/api";
import { DoughnutChart, LineChart } from "../../specific/Charts";

const Clock = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{time.format("dddd || Do MMMM YYYY || h:mm:ss a")}</>;
};

const Dashboard = () => {
  const {
    data: stats,
    isLoading: loadingStats,
    isError: errorStats,
    error: errorStatsMessage,
  } = useGetDashboardStatsQuery();

  useErrors([
    {
      isError: errorStats,
      error: errorStatsMessage,
    },
  ]);

  const AppBar = (
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
        <CurveButton>Search</CurveButton>
        <NotificationsIcon />
      </Stack>
      <Stack alignItems={"center"} marginTop={"1rem"}>
        <Typography color="rgba(0, 0, 0, 0.7)">
          <Clock />{" "}
        </Typography>
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      margin={"1rem 0"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        gap: "1rem",
      }}
    >
      <Widget
        title={"Total Users"}
        a
        value={stats?.stats?.totalUsers || 0}
        Icon={<PersonIcon />}
        key={"total-users"}
      />
      <Widget
        title={"Total Chats"}
        value={stats?.stats?.totalChats || 0}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Total messages"}
        value={stats?.stats?.totalMessages || 0}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loadingStats ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            fontSize={"2rem"}
            fontWeight={600}
            color={matBlack}
            textAlign={"center"}
            margin={"2rem 0"}
          >
            Loading Dashboard Stats
          </Typography>
        </div>
      ) : errorStats ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            fontSize={"2rem"}
            fontWeight={600}
            color={matBlack}
            textAlign={"center"}
            margin={"2rem 0"}
          >
            {errorStatsMessage}
          </Typography>
        </div>
      ) : (
        <Container component={"main"}>
          {AppBar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
                // height: "25rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>
              <LineChart value={stats?.stats?.last7DaysMessages || []} />
            </Paper>
            <Paper
              elevation={6}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",

                alignItems: "center",
                width: {
                  xs: "100%",
                  sm: "50%",
                },
                position: "relative",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.stats?.singleChatCount || 0,
                  stats?.stats?.groupChatCount || 0,
                ]}
              />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon />
                <Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={6}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
