import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const confirmDeleteDialog = ({ open, close, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this chat? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={close}>
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
