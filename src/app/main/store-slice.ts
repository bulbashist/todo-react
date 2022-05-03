import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./types";

type TasksState = Array<ITask>;

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as TasksState,
  reducers: {
    addTask(state: TasksState, action: PayloadAction<ITask>) {
      return [action.payload, ...state];
    },
    changeTask(state: TasksState, action: PayloadAction<ITask>) {
      const stateCopy = [...state];
      let index = stateCopy.findIndex((task) => task.id === action.payload.id);
      stateCopy[index] = action.payload;
      return stateCopy;
    },
    deleteTask(state: TasksState, action: PayloadAction<ITask>) {
      const stateCopy = [...state];
      stateCopy.splice(
        stateCopy.findIndex((task) => task.id === action.payload.id),
        1
      );
      return stateCopy;
    },
  },
});

export const { addTask, changeTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
