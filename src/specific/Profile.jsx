import {
  CalendarMonth as CalendarIcon,
  Email as EmailIcon,
  Face as FaceIcon,
  Link as LinkIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import { Avatar, Box, Stack, Switch, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { gradientBg } from "../constants/color";
import { transformImageUrl } from "../lib/features";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const baseUrl = `${window.location.origin}`;
  const profileUrl = `${baseUrl}/u/${user.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard!", {
      duration: 2000,
    });
  };

  const [isAcceptingMessages, setIsAcceptingMessages] = useState(
    user?.isAcceptingMessages || false
  );

  const handleAcceptMessages = async () => {
    setIsAcceptingMessages((prev) => !prev);
    const toastId = toast.loading("Updating Accepting Messages...");
    try {
      const response = await axios.post(
        `${server}/user/acceptMessages`,
        {
          isAcceptingMessages: !isAcceptingMessages,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          `You are now ${
            !isAcceptingMessages ? "accepting" : "not accepting"
          } messages!`,
          {
            duration: 1000,
            id: toastId,
          }
        );
        setIsAcceptingMessages(!isAcceptingMessages);
      } else {
        toast.error("Failed to update accepting messages", {
          duration: 1000,
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to update accepting messages", {
        duration: 1000,
        id: toastId,
      });
    }
  };

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
          src={transformImageUrl(user?.avatar?.url)}
          alt="Profile Avatar"
        />
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
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleAcceptMessages}
        >
          <Stack>
            <Typography variant="body1" fontWeight={600}>
              Accept Anonymous Messages
            </Typography>
            <Typography color="gray" variant="caption">
              {isAcceptingMessages}
            </Typography>
          </Stack>
          <Switch checked={isAcceptingMessages} color="primary" size="medium" />
        </Stack>
        <ProfileCard heading="Name" text={user?.name} Icon={<FaceIcon />} />
        <ProfileCard
          heading="Username"
          text={user?.username}
          Icon={<UsernameIcon />}
        />
        <ProfileCard heading="Email" text={user?.email} Icon={<EmailIcon />} />
        <ProfileCard
          heading="Joining Days"
          text={moment(user?.createdAt).fromNow(true)}
          Icon={<CalendarIcon />}
        />
        {isAcceptingMessages && (
          <ProfileCard
            heading="Profile URL"
            text={profileUrl}
            Icon={<LinkIcon />}
            handler={copyToClipboard}
          />
        )}
      </Stack>
    </Box>
  );
};

const ProfileCard = ({ text, Icon, heading, handler = () => {} }) => (
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
      alignItems: "center",
      justifyContent: "center",
      cursor: heading === "Profile URL" ? "pointer" : "default",
    }}
    onClick={handler}
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
