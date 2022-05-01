import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { ITask } from "../../types";

const useTasks = (): Array<ITask> => {
  const tasks: Array<ITask> = [
    ...useSelector((state: RootState) => state.tasks),
  ];

  tasks.sort((a: ITask, b: ITask) => {
    return (
      new Date(Date.parse(a.date!)).getTime() -
      new Date(Date.parse(b.date!)).getTime()
    );
  });
  return tasks;
};

export { useTasks };
