import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImageUrl } from "../../lib/features";
import { useGetMessagesDashboardStatsQuery } from "../../redux/api/api";

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
            <Box key={index} height={"100%"}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
                height={"100%"}
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
      <Stack
        height={"100%"}
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyItems={"center"}
      >
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
  const {
    data: messagesDashboardData,
    isLoading: loadingMessagesDashboardData,
    isError: errorMessagesDashboardData,
    error: errorMessagesDashboardDataMessage,
  } = useGetMessagesDashboardStatsQuery();

  useErrors([
    {
      isError: errorMessagesDashboardData,
      error: errorMessagesDashboardDataMessage,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!messagesDashboardData) return;
    setRows(
      messagesDashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          ...message.sender,
          avatar: transformImageUrl(message.sender.avatar, 50),
        },
        createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, [messagesDashboardData]);

  return (
    <AdminLayout>
      {loadingMessagesDashboardData ? (
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
            Loading Messages...
          </Typography>
        </div>
      ) : errorMessagesDashboardData ? (
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
            {errorMessagesDashboardDataMessage}
          </Typography>
        </div>
      ) : (
        <Table
          headings={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
