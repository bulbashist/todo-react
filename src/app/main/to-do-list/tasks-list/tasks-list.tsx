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
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITask } from "../../types";
import { Edit, Delete, ExpandMore } from "@mui/icons-material";
import { deleteTask } from "../../store-slice";

function TasksList() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

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
    <Container maxWidth="md">
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
                </AccordionSummary>
                <AccordionDetails>
                  <p>{task.description}</p>
                  {task.date}
                </AccordionDetails>
              </Accordion>
              {/* </Alert> */}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default TasksList;
