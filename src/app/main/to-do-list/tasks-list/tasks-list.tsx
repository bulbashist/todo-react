import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Input,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITask } from "../../types";
import { Edit, Delete } from "@mui/icons-material";
import { deleteTask } from "../../store-slice";

function TasksList() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth="md">
      <List>
        <Alert color="info" severity="info">
          tt
        </Alert>
        {tasks.map((task: ITask) => {
          return (
            <ListItem
              key={task.id}
              alignItems="center"
              id={task.id}
              divider={true}
            >
              {task.isBeingChanged ? (
                <Input defaultValue={task.description} />
              ) : (
                <ListItemText primary={task.description}></ListItemText>
              )}
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => {}}>
                  <Edit />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => dispatch(deleteTask(task))}
                >
                  <Delete />
                </Button>
              </Stack>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default TasksList;
