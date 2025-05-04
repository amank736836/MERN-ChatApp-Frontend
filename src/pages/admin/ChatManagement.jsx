import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImageUrl } from "../../lib/features";
import { useGetChatsDashboardStatsQuery } from "../../redux/api/api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 100,
  },

  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 300,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <Typography>{params.row.creator.name}</Typography>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const {
    data: chatDashboardData,
    isLoading: loadingChatDashboardData,
    isError: errorChatDashboardData,
    error: errorChatDashboardDataMessage,
  } = useGetChatsDashboardStatsQuery();

  useErrors([
    {
      isError: errorChatDashboardData,
      error: errorChatDashboardDataMessage,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!chatDashboardData) return;
    setRows(
      chatDashboardData.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: chat.avatar.map((member) => transformImageUrl(member, 50)),
        members: chat.members.map((member) =>
          transformImageUrl(member.avatar, 50)
        ),
        creator: {
          ...chat.creator,
          avatar: transformImageUrl(chat.creator.avatar, 50),
        },
      }))
    );
  }, [chatDashboardData]);


  return (
    <AdminLayout>
      {loadingChatDashboardData ? (
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
            color={"black"}
            textAlign={"center"}
            margin={"2rem 0"}
          >
            Loading Chats...
          </Typography>
        </div>
      ) : errorChatDashboardData ? (
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
            color={"black"}
            textAlign={"center"}
            margin={"2rem 0"}
          >
            {errorChatDashboardDataMessage}
          </Typography>
        </div>
      ) : (
        <Table headings={"All Chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
