export interface ITask {
  id: string;
  description: string;
  date?: string;
  isCompleted?: boolean;
  isBeingChanged: boolean;
}
