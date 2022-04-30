import { Box, Container, Stack } from "@mui/material";
import React, { Fragment } from "react";
import TasksInput from "./tasks-input/tasks-input";
import TasksList from "./tasks-list/tasks-list";

function ToDoList() {
  return (
    <Stack alignItems="center">
      <TasksInput />
      <TasksList />
    </Stack>
  );
}

export default ToDoList;
