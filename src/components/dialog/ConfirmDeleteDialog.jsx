import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsDeleteMenu } from "../../redux/reducers/misc.reducer";
import { useNavigate } from "react-router-dom";
import { useDeleteChatMutation } from "../../redux/api/api";

const confirmDeleteDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDeleteMenu } = useSelector((state) => state.misc);

  const handleClose = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const [
    deleteChatMutation,
    {
      data: deleteChatData,
      isLoading: isLoadingDeleteChat,
      isError: isErrorDeleteChat,
      error: errorDeleteChat,
    },
  ] = useAsyncMutation(useDeleteChatMutation);

  useErrors([
    {
      isError: isErrorDeleteChat,
      error: errorDeleteChat,
    },
  ]);

  const deleteHandler = () => {
    deleteChatMutation("Deleting Group...", chatId);
    navigate("/groups");
    handleClose();
  };

  return (
    <Dialog open={isDeleteMenu} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this chat? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={handleClose}>
          No
        </Button>
        <Button color="error" onClick={deleteHandler}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default confirmDeleteDialog;
