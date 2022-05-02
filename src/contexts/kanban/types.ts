import { Status } from "../../constants/taskStatus";

export type ColumnId = string;
export type TaskId = string;

export type TaskState = {
  id: TaskId;
  name: string;
  description: string;
  status: Status;
  creationDatetime: number;
};

export type ColumnState = {
  id: ColumnId;
  name: string;
  taskList: Array<TaskId>;
  archivedTaskList: Array<string>;
};

export type KanbanState = {
  columns: Record<ColumnId, ColumnState>;
  tasks: Record<TaskId, TaskState>;
  columnList: Array<ColumnId>;
};

export type TaskPayload = {
  id: TaskId;
  name: string;
  description: string;
  status: Status;
};

export type AddTaskPayload = {
  id: TaskId;
  name: string;
  description: string;
  columnId: ColumnId;
};

const ADD_COLUMN = "ADD_COLUMN";
const ADD_TASK = "ADD_TASK";
const UPDATE_COLUMN = "UPDATE_COLUMN";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_COLUMN_ORDER = "UPDATE_COLUMN_ORDER";
const UPDATE_TASK_ORDER = "UPDATE_TASK_ORDER";
const UPDATE_TASK_ARCHIVE = "UPDATE_TASK_ARCHIVE";
const DELETE_COLUMN = "DELETE_COLUMN";
const DELETE_TASK = "DELETE_TASK";
const MOVE_TASK = "MOVE_TASK";
const SET_STATE = "SET_STATE";

export type ColumnPayload = {
  id: ColumnId;
  name: string;
  taskList: Array<TaskId>;
};

export type AddColumnPayload = {
  id: ColumnId;
  name: string;
};

export type UpdateColumnOrderPayload = {
  id: ColumnId;
  newOrderIndex: number;
};

export type UpdateTaskOrderPayload = {
  id: TaskId;
  columnId: ColumnId;
  newOrderIndex: number;
};

export type UpdateTaskArchivePayload = {
  id: TaskId;
  columnId: ColumnId;
  archived: boolean;
};

export type DeleteTaskPayload = {
  id: TaskId;
  parentColumnId: ColumnId;
};

export type MoveTaskPayload = {
  id: TaskId;
  fromColumnId: ColumnId;
  toColumnId: ColumnId;
  orderIndex: number;
};

type AddColumnAction = {
  type: typeof ADD_COLUMN;
  payload: AddColumnPayload;
};

type AddTaskAction = {
  type: typeof ADD_TASK;
  payload: AddTaskPayload;
};

type UpdateColumnAction = {
  type: typeof UPDATE_COLUMN;
  payload: Partial<ColumnPayload> & { id: ColumnId };
};

type UpdateTaskAction = {
  type: typeof UPDATE_TASK;
  payload: Partial<TaskPayload> & { id: ColumnId };
};

type UpdateColumnOrderAction = {
  type: typeof UPDATE_COLUMN_ORDER;
  payload: UpdateColumnOrderPayload;
};

type UpdateTaskOrderAction = {
  type: typeof UPDATE_TASK_ORDER;
  payload: UpdateTaskOrderPayload;
};

type UpdateTaskArchiveAction = {
  type: typeof UPDATE_TASK_ARCHIVE;
  payload: UpdateTaskArchivePayload;
};

type DeleteColumnAction = {
  type: typeof DELETE_COLUMN;
  payload: ColumnId;
};

type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  payload: DeleteTaskPayload;
};

type MoveTaskAction = {
  type: typeof MOVE_TASK;
  payload: MoveTaskPayload;
};

type SetStateAction = {
  type: typeof SET_STATE;
  payload: KanbanState;
};

export type KanbanContextAction =
  | AddColumnAction
  | AddTaskAction
  | UpdateColumnAction
  | UpdateTaskAction
  | UpdateColumnOrderAction
  | UpdateTaskOrderAction
  | UpdateTaskArchiveAction
  | DeleteColumnAction
  | DeleteTaskAction
  | MoveTaskAction
  | SetStateAction;

export type AddColumn = (name: Omit<AddColumnPayload, "id">) => ColumnId;
export type AddTask = (task: Omit<AddTaskPayload, "id">) => TaskId;
export type UpdateColumn = (column: Partial<ColumnPayload> & { id: ColumnId }) => void;
export type UpdateTask = (task: Partial<TaskPayload> & { id: TaskId }) => void;
export type UpdateColumnOrder = (params: UpdateColumnOrderPayload) => void;
export type UpdateTaskOrder = (params: UpdateTaskOrderPayload) => void;
export type UpdateTaskArchive = (params: UpdateTaskArchivePayload) => void;
export type DeleteColumn = (id: ColumnId) => void;
export type DeleteTask = (params: DeleteTaskPayload) => void;
export type MoveTask = (params: MoveTaskPayload) => void;
export type GetColumns = () => Array<ColumnState>;
export type GetTask = (id: TaskId) => TaskState;

export type KanbanContext = {
  addColumn: AddColumn;
  addTask: AddTask;
  updateColumn: UpdateColumn;
  updateTask: UpdateTask;
  updateColumnOrder: UpdateColumnOrder;
  updateTaskOrder: UpdateTaskOrder;
  updateTaskArchive: UpdateTaskArchive;
  deleteColumn: DeleteColumn;
  deleteTask: DeleteTask;
  moveTask: MoveTask;
  getColumns: GetColumns;
  getTask: GetTask;
};
