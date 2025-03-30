import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Profile Avatar"
      />
      <ProfileCard
        heading={"Username"}
        text={"JohnDoe123"}
        Icon={<UsernameIcon />}
      />
      <ProfileCard heading={"Name"} text={"John Doe"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Bio"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <ProfileCard
        heading={"Joined On"}
        text={moment("2023-01-01").fromNow(true)}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={"1rem"}
    direction={"row"}
    alignItems={"center"}
    textAlign={"center"}
    color={"white"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
