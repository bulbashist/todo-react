import React from "react";
import { Button, FormControl, Input, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { AppDispatch } from "../../../../store";
import { ITask } from "../../types";
import { addTask } from "../../store-slice";
import "./tasks-input.scss";
import { useForm } from "react-hook-form";

type IFormTaskData = Pick<ITask, "date" | "description" | "title">;

function TasksInput() {
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, register } = useForm<IFormTaskData>();

  function storeTask(data: IFormTaskData) {
    const task: ITask = {
      id: uuid(),
      ...data,
      isBeingChanged: false,
      isCompleted: false,
    };
    dispatch(addTask(task));
  }

  return (
    <form onSubmit={handleSubmit((data: IFormTaskData) => storeTask(data))}>
      <FormControl error={true}>
        <Stack direction="row" spacing={2}>
          <TextField
            type="text"
            variant="standard"
            size="small"
            {...register("title")}
          />
          <TextField
            type="date"
            variant="standard"
            size="small"
            {...register("date")}
          />
          <TextField
            type="text"
            variant="standard"
            size="small"
            {...register("description")}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}

export default TasksInput;
