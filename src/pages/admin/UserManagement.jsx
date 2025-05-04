import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImageUrl } from "../../lib/features";
import { useGetUsersDashboardStatsQuery } from "../../redux/api/api";

const UserColumns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 75,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 75,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 90,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    headerClassName: "table-header",
    width: 175,
  },
];

const UserManagement = () => {
  const {
    data: userDashboardData,
    isLoading: loadingUserDashboardData,
    isError: errorUserDashboardData,
    error: errorUserDashboardDataMessage,
  } = useGetUsersDashboardStatsQuery();

  useErrors([
    {
      isError: errorUserDashboardData,
      error: errorUserDashboardDataMessage,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!userDashboardData) return;
    setRows(
      userDashboardData.users.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImageUrl(user.avatar, 50),
      }))
    );
  }, [userDashboardData]);

  return (
    <AdminLayout>
      {loadingUserDashboardData ? (
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
            Loading Users...
          </Typography>
        </div>
      ) : errorUserDashboardData ? (
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
            {errorUserDashboardDataMessage}
          </Typography>
        </div>
      ) : (
        <Table headings={"All Users"} columns={UserColumns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
