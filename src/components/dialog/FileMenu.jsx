import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import toast from "react-hot-toast";

const FileMenu = ({ anchorE1, chatId }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  };

  const [
    sendAttachments,
    {
      isLoading: isLoadingSendAttachments,
      isError: isErrorSendAttachments,
      error: errorSendAttachments,
    },
  ] = useSendAttachmentsMutation();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectImage = () => {
    imageRef.current?.click();
  };

  const selectAudio = () => {
    audioRef.current?.click();
  };

  const selectVideo = () => {
    videoRef.current?.click();
  };

  const selectFile = () => {
    fileRef.current?.click();
  };

  const handleFileUpload = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5) {
      toast.error(
        `You can only upload 5 
        ${key} at a time!`,
        {
          duration: 1000,
        }
      );
      return;
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Uploading ${key}...`);

    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);

      files.forEach((file) => {
        myForm.append("files", file);
      });

      const res = await sendAttachments(myForm);

      if (res.data) {
        toast.success(`${key} sent successfully`, {
          duration: 1000,
          id: toastId,
        });
      } else if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message || `Error uploading ${key}`, {
          duration: 1000,
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading files", {
        duration: 1000,
        id: toastId,
      });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorE1}
      open={isFileMenu}
      onClose={closeFileMenu}
      sx={{
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div style={{ width: "10rem", borderRadius: "0.5rem" }}>
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              ref={imageRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              multiple
              style={{
                display: "none",
              }}
              onChange={(e) => handleFileUpload(e, "Images")}
            />
          </MenuItem>
          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              ref={audioRef}
              type="file"
              accept="audio/mpeg, audio/wav, audio/mp3, audio/aac, audio/m4a, audio/flac"
              multiple
              style={{
                display: "none",
              }}
              onChange={(e) => handleFileUpload(e, "Audios")}
            />
          </MenuItem>
          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              ref={videoRef}
              type="file"
              accept="video/mp4, video/webm, video/mkv, video/avi, video/mov, video/flv, video/wmv"
              multiple
              style={{
                display: "none",
              }}
              onChange={(e) => handleFileUpload(e, "Videos")}
            />
          </MenuItem>
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              ref={fileRef}
              type="file"
              accept="*"
              multiple
              style={{
                display: "none",
              }}
              onChange={(e) => handleFileUpload(e, "Files")}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
