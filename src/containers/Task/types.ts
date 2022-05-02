import { ColumnId, TaskState } from "../../contexts/kanban/types";

export type TaskDragItem = {
  index: number;
  task: TaskState;
  parentColumnId: ColumnId;
  type: string;
};
