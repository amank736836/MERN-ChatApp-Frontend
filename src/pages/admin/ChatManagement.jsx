import { Avatar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { transformImageUrl } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 100,
    renderCell: (params) => {
      return <AvatarCard max={1} avatar={params.row.avatar} />;
    },
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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: transformImageUrl(chat.avatar, 50),
        members: chat.members.map((member) =>
          transformImageUrl(member.avatar, 50)
        ),
        creator: {
          ...chat.creator,
          avatar: transformImageUrl(chat.creator.avatar, 50),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table headings={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
