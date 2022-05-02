import { ColumnId, TaskState } from "../../contexts/kanban/types";

export type DragItem = {
  index: number;
  task: TaskState;
  parentColumnId: ColumnId;
  type: string;
};
