import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertColor,
  Button,
  Container,
  Input,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITask } from "../../types";
import { Edit, Delete, ExpandMore } from "@mui/icons-material";
import { changeTask, deleteTask } from "../../store-slice";
import { useTasks } from "./useTasks";

function TasksList() {
  const tasks = useTasks();
  const dispatch = useDispatch<AppDispatch>();

  function takeData(e: MouseEvent<HTMLButtonElement>, task: ITask) {
    e.stopPropagation();
    if (!task.isBeingChanged) {
      dispatch(
        changeTask({
          ...task,
          isBeingChanged: true,
        })
      );
      return;
    } else {
      //random path cuz MUI and no ref
      const title = (
        e.currentTarget.parentElement?.previousElementSibling?.lastElementChild
          ?.firstElementChild?.firstElementChild as HTMLInputElement
      ).value;
      const temp =
        e.currentTarget.parentElement?.parentElement?.parentElement
          ?.nextElementSibling?.firstElementChild?.firstElementChild
          ?.firstElementChild?.firstElementChild;
      const description = (
        temp?.firstElementChild?.firstElementChild as HTMLInputElement
      ).value;
      const date = (
        temp?.lastElementChild?.firstElementChild as HTMLInputElement
      ).value;
      dispatch(
        changeTask({
          ...task,
          isBeingChanged: false,
          title,
          description,
          date,
        })
      );
    }
  }

  function checkSeverity(task: ITask): AlertColor {
    const date = new Date(Date.parse(task.date!)).getTime();
    const remainingTime = date - Date.now();
    const severity: AlertColor =
      remainingTime <= 0
        ? "error"
        : remainingTime <= 86400 * 1000
        ? "warning"
        : "info";
    return severity;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "15px",
      }}
    >
      <List>
        {tasks.map((task: ITask) => {
          return (
            <ListItem key={task.id} alignItems="center" id={task.id}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Alert
                    severity={checkSeverity(task)}
                    variant="outlined"
                    sx={{
                      alignItems: "center",
                      width: "100%",
                      marginRight: "20px",
                    }}
                  >
                    {task.isBeingChanged ? (
                      <Input defaultValue={task.title} />
                    ) : (
                      <ListItemText primary={task.title}></ListItemText>
                    )}
                  </Alert>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      margin: "0px 20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={(e) => takeData(e, task)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => dispatch(deleteTask(task))}
                    >
                      <Delete />
                    </Button>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {task.isBeingChanged ? (
                    <Fragment>
                      <Input type="text" defaultValue={task.description} />
                      <Input
                        type="date"
                        defaultValue={task.date}
                        sx={{
                          display: "block",
                          alignSelf: "end",
                          width: "200px",
                        }}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography
                        color="green"
                        sx={{
                          overflowWrap: "break-word",
                        }}
                      >
                        {task.description !== ""
                          ? task.description
                          : "No detailed information provided"}
                      </Typography>
                      <Typography textAlign="right">{task.date}</Typography>
                    </Fragment>
                  )}
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default TasksList;
