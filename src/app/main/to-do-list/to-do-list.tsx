import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import TasksInput from "./tasks-input/tasks-input";
import TasksList from "./tasks-list/tasks-list";

function ToDoList() {
  const [open, setOpen] = useState(false);

  return (
    <Stack alignItems="center">
      <h1>TO-DO List</h1>
      <Dialog open={open}>
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogContentText>Add new task</DialogContentText>
          <Button onClick={() => setOpen(false)}>
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent>
          <TasksInput closeDialog={setOpen} />
        </DialogContent>
      </Dialog>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add task
      </Button>
      <TasksList />
    </Stack>
  );
}

export default ToDoList;
