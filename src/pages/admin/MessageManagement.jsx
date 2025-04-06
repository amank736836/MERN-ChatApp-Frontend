import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImageUrl } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments.length > 0 ? (
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const fileType = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(fileType, url)}
              </a>
            </Box>
          );
        })
      ) : (
        <Typography
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          fontWeight={400}
        >
          No Attachments
        </Typography>
      );
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.name} src={params.row.sender.avatar} />
        <Typography>{params.row.sender.name}</Typography>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 125,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 125,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 150,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          ...message.sender,
          avatar: transformImageUrl(message.sender.avatar, 50),
        },
        createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        headings={"All Messages"}
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
