import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { gradientBg } from "../constants/color";
import { server } from "../constants/config";

const specialChar = "||";

const parseStringMessages = (messageString) => {
  return messageString.split(specialChar).map((msg) => msg.trim());
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const Username = () => {
  const params = useParams();
  const username = params.username || null;

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageString, setMessageString] = useState(initialMessageString);
  const [messageArray, setMessageArray] = useState([]);
  const [isCompletionLoading, setIsCompletionLoading] = useState(false);
  const [completionError, setCompletionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${server}/chat/sendMessage`, {
        content,
        username,
        sender: user,
      });

      toast.success(response.data.message || "Message sent");
      if (response.data.success) setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
      fetchSuggestedMessages();
    }
  };

  const fetchSuggestedMessages = useCallback(async () => {
    setIsCompletionLoading(true);
    try {
      const response = await axios.post(`${server}/chat/suggestMessages`, {
        exclude: messageString,
      });

      if (response.data.success) {
        setMessageString(response.data.message);
        setCompletionError(null);
      } else {
        setMessageString(initialMessageString);
        toast.error("Failed to fetch suggested messages. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to fetch suggested messages. Please try again.");
      setCompletionError(error);
    } finally {
      setIsCompletionLoading(false);
    }
  }, [messageString]);

  useEffect(() => {
    setMessageArray(parseStringMessages(messageString));
  }, [messageString]);

  useEffect(() => {
    if (!username) return;
    if (user && user.username === username) {
      toast.error("You are not authorized to view this page.");
      navigate("/");
      return;
    }
    fetchSuggestedMessages();
  }, []);

  const handleMessageClick = (msg) => {
    setContent(msg);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: gradientBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Stack
        spacing={3}
        component={Paper}
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: "2rem",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600}>
          Send Anonymous Message to @{username}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your anonymous message here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || !content}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Send Message"}
          </Button>
        </form>

        <Button
          fullWidth
          variant="outlined"
          onClick={fetchSuggestedMessages}
          disabled={isCompletionLoading}
        >
          {isCompletionLoading ? "Loading..." : "Suggest Messages"}
        </Button>

        {completionError && (
          <Typography color="error" textAlign="center">
            {completionError.message}
          </Typography>
        )}

        <Box>
          <Typography variant="h6" gutterBottom>
            Suggested Messages
          </Typography>
          {messageArray.length > 0 ? (
            <Stack spacing={1}>
              {messageArray.map((msg, i) => (
                <Button
                  key={i}
                  onClick={() => handleMessageClick(msg)}
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: "flex-start" }}
                >
                  {msg}
                </Button>
              ))}
            </Stack>
          ) : (
            <Typography>No messages to suggest</Typography>
          )}
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Get Your Own Message Board
          </Typography>
          <Button
            href="/sign-up"
            variant="contained"
            sx={{ mt: 1, px: 3, borderRadius: "999px" }}
          >
            Create Your Account
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Username;
