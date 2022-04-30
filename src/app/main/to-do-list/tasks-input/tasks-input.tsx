import React, { useRef } from "react";
import { Button, FormControl, Input, Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { AppDispatch } from "../../../../store";
import { ITask } from "../../types";
import { addTask } from "../../store-slice";
import "./tasks-input.scss";

function TasksInput() {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  function storeTask() {
    const task: ITask = {
      id: uuid(),
      description: ref.current!.value,
      isBeingChanged: false,
    };
    dispatch(addTask(task));
  }

  return (
    <FormControl error={true} className="form">
      <Stack direction="row" spacing={2}>
        <Input inputProps={{ ref }} />
        <Button variant="contained" onClick={storeTask}>
          Add
        </Button>
      </Stack>
    </FormControl>
  );
}

export default TasksInput;
