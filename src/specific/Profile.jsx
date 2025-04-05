import {
  CalendarMonth as CalendarIcon,
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { gradientBg } from "../constants/color";

const Profile = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: gradientBg,
        padding: "2rem",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: "500px",
          padding: "1rem",
          borderRadius: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            border: "5px solid white",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile Avatar"
        />
        <ProfileCard
          heading="Username"
          text="JohnDoe123"
          Icon={<UsernameIcon />}
        />
        <ProfileCard heading="Name" text="John Doe" Icon={<FaceIcon />} />
        <ProfileCard
          heading="Bio"
          text="Passionate developer and tech enthusiast."
        />
        <ProfileCard
          heading="Joined On"
          text={moment("2023-01-01").fromNow(true)}
          Icon={<CalendarIcon />}
        />
      </Stack>
    </Box>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={1}
    direction="row"
    alignItems="center"
    sx={{
      width: "100%",
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#f5f5f5",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    {Icon && <Box sx={{ color: "#1976d2" }}>{Icon}</Box>}
    <Stack>
      <Typography variant="body1" fontWeight={600}>
        {text}
      </Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
