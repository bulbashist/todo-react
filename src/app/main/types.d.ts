export interface ITask {
  id: string;
  title: string;
  description?: string;
  date?: string;
  isBeingChanged: boolean;
}
