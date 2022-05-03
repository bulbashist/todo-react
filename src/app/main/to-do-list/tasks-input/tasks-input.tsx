import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  FormControl,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { AppDispatch } from "../../../../store";
import { ITask } from "../../types";
import { addTask } from "../../store-slice";
import { useForm } from "react-hook-form";

type IFormTaskData = Pick<ITask, "date" | "description" | "title">;
type IProps = {
  closeDialog: Dispatch<SetStateAction<boolean>>;
};

function TasksInput(props: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, register } = useForm<IFormTaskData>();

  function storeTask(data: IFormTaskData) {
    const task: ITask = {
      id: uuid(),
      ...data,
      isBeingChanged: false,
    };
    dispatch(addTask(task));
    props.closeDialog(false);
  }

  return (
    <form onSubmit={handleSubmit((data: IFormTaskData) => storeTask(data))}>
      <FormControl
        error={true}
        sx={{
          border: "2px solid black",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} textAlign="center">
            <TextField
              type="text"
              required
              variant="standard"
              size="small"
              {...register("title")}
            />
          </Grid>
          <Grid item xs={6} textAlign="center">
            <TextField
              type="date"
              variant="standard"
              size="small"
              {...register("date")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              placeholder="Enter your description"
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              minRows={4}
              {...register("description")}
            />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={4} justifySelf="end" textAlign="right">
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

export default TasksInput;
