import { createContext, useCallback, useEffect, useReducer } from "react";
import { OPEN } from "../../constants/taskStatus";
import arrayMove from "../../utils/arrayMove";
import deepFreeze from "../../utils/deepFreeze";
import { v4 as uuidv4 } from "uuid";
import omit from "lodash/omit";
import {
  ColumnPayload,
  AddTaskPayload,
  ColumnState,
  KanbanContextAction,
  KanbanState,
  TaskPayload,
  TaskState,
  UpdateColumnOrderPayload,
  UpdateTaskOrderPayload,
  UpdateTaskArchivePayload,
  KanbanContext,
  ColumnId,
  AddColumn,
  AddTask,
  UpdateColumn,
  UpdateColumnOrder,
  UpdateTaskOrder,
  UpdateTaskArchive,
  GetColumns,
  GetTask,
  TaskId,
  DeleteColumn,
} from "./types";

const LOCAL_STORAGE_KEY = "kanbanState";

const initialTaskState: TaskState = Object.freeze({
  id: "",
  name: "",
  description: "",
  status: OPEN,
});

const initialColumnState: ColumnState = Object.freeze({
  id: "",
  name: "",
  taskList: [],
  archivedTaskList: [],
});

const initialKanbanState: KanbanState = Object.freeze({
  columns: {},
  tasks: {},
  columnList: [],
});

function _updateTask(state: KanbanState, task: TaskState): KanbanState {
  try {
    const tasks = state.tasks;
    return deepFreeze<KanbanState>({
      ...state,
      tasks: {
        ...tasks,
        [task.id]: task,
      },
    });
  } catch (e) {
    return state;
  }
}

function _updateColumn(state: KanbanState, column: ColumnState): KanbanState {
  try {
    const columns = state.columns;
    return deepFreeze<KanbanState>({
      ...state,
      columns: {
        ...columns,
        [column.id]: column,
      },
    });
  } catch (e) {
    return state;
  }
}

function updateTask(state: KanbanState, payload: Partial<TaskPayload> & { id: TaskId }): KanbanState {
  const tasks = state.tasks;
  return _updateTask(state, {
    ...tasks[payload.id],
    ...payload,
  });
}

function updateTaskOrder(state: KanbanState, payload: UpdateTaskOrderPayload): KanbanState {
  try {
    const columns = state.columns;
    const column = columns[payload.columnId];
    const taskList = column.taskList;
    return _updateColumn(state, {
      ...column,
      taskList: arrayMove(taskList, taskList.indexOf(payload.id), payload.newOrderIndex),
    });
  } catch (e) {
    return state;
  }
}

function updateColumn(state: KanbanState, payload: Partial<ColumnPayload> & { id: ColumnId }): KanbanState {
  try {
    const columns = state.columns;
    return _updateColumn(state, {
      ...columns[payload.id],
      ...payload,
    });
  } catch (e) {
    return state;
  }
}

function updateColumnOrder(state: KanbanState, payload: UpdateColumnOrderPayload): KanbanState {
  try {
    const columnList = state.columnList;
    return deepFreeze<KanbanState>({
      ...state,
      columnList: arrayMove(columnList, columnList.indexOf(payload.id), payload.newOrderIndex),
    });
  } catch (e) {
    return state;
  }
}

function updateTaskArchive(state: KanbanState, payload: UpdateTaskArchivePayload): KanbanState {
  try {
    const column = state.columns[payload.columnId];
    const taskList = column.taskList;
    const archivedTaskList = column.archivedTaskList;
    const id = payload.id;
    const archived = payload.archived;
    return _updateColumn(state, {
      ...column,
      taskList: archived ? taskList.filter(tId => tId !== id) : [...taskList, id],
      archivedTaskList: archived ? [...archivedTaskList, id] : archivedTaskList.filter(tId => tId !== id),
    });
  } catch (e) {
    return state;
  }
}

function addColumn(state: KanbanState, payload: ColumnPayload): KanbanState {
  // Todo: error check for existing columnId
  try {
    const newState = _updateColumn(state, {
      ...initialColumnState,
      ...payload,
    });
    return deepFreeze<KanbanState>({
      ...newState,
      columnList: [...state.columnList, payload.id],
    });
  } catch (e) {
    return state;
  }
}

function addTask(state: KanbanState, payload: AddTaskPayload): KanbanState {
  // Todo: error check for existing taskId
  try {
    const column = state.columns[payload.columnId];
    const taskList = column.taskList;
    const newState = _updateTask(state, {
      ...initialTaskState,
      ...payload,
    });
    return _updateColumn(newState, {
      ...column,
      taskList: [...taskList, payload.id],
    });
  } catch (e) {
    return state;
  }
}

function deleteColumn(state: KanbanState, id: ColumnId): KanbanState {
  // Todo: error check for existing id
  try {
    const taskList = state.columns[id].taskList;
    return deepFreeze<KanbanState>({
      ...state,
      tasks: omit(state.tasks, taskList),
      columns: omit(state.columns, [id]),
      columnList: state.columnList.filter(columnId => columnId !== id),
    });
  } catch (e) {
    return state;
  }
}

const Reducer = (state: KanbanState, action: KanbanContextAction): KanbanState => {
  switch (action.type) {
    case "ADD_COLUMN":
      return addColumn(state, action.payload);

    case "ADD_TASK":
      return addTask(state, action.payload);

    case "UPDATE_COLUMN":
      return updateColumn(state, action.payload);

    case "UPDATE_TASK":
      return updateTask(state, action.payload);

    case "UPDATE_COLUMN_ORDER":
      return updateColumnOrder(state, action.payload);

    case "UPDATE_TASK_ORDER":
      return updateTaskOrder(state, action.payload);

    case "UPDATE_TASK_ARCHIVE":
      return updateTaskArchive(state, action.payload);

    case "DELETE_COLUMN":
      return deleteColumn(state, action.payload);

    case "SET_STATE":
      return deepFreeze<KanbanState>(action.payload);

    default:
      return state;
  }
};

export const Context = createContext<KanbanContext>({
  addColumn: () => "",
  addTask: () => "",
  updateColumn: () => void 0,
  updateTask: () => void 0,
  updateColumnOrder: () => void 0,
  updateTaskOrder: () => void 0,
  updateTaskArchive: () => void 0,
  deleteColumn: () => void 0,
  getColumns: () => [],
  getTask: () => initialTaskState,
});
export const Provider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(Reducer, initialKanbanState);

  const saveStateToLocalStorage = useCallback(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(
    function beforeunload() {
      try {
        window.addEventListener("beforeunload", saveStateToLocalStorage);

        return () => window.removeEventListener("beforeunload", saveStateToLocalStorage);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    [saveStateToLocalStorage],
  );
  useEffect(
    function restoreState() {
      try {
        const localStorageState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localStorageState) {
          const parsedState: KanbanState = JSON.parse(localStorageState);

          dispatch({
            type: "SET_STATE",
            payload: parsedState,
          });
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    [dispatch],
  );

  const addColumn: AddColumn = useCallback(column => {
    const id = uuidv4();
    dispatch({
      type: "ADD_COLUMN",
      payload: { id, ...column },
    });
    return id;
  }, []);

  const addTask: AddTask = useCallback(task => {
    const id = uuidv4();
    dispatch({
      type: "ADD_TASK",
      payload: { id, ...task },
    });
    return id;
  }, []);

  const updateColumn: UpdateColumn = useCallback(column => {
    dispatch({
      type: "UPDATE_COLUMN",
      payload: column,
    });
  }, []);

  const updateTask: UpdateColumn = useCallback(task => {
    dispatch({
      type: "UPDATE_TASK",
      payload: task,
    });
  }, []);

  const updateColumnOrder: UpdateColumnOrder = useCallback(params => {
    dispatch({
      type: "UPDATE_COLUMN_ORDER",
      payload: params,
    });
  }, []);

  const updateTaskOrder: UpdateTaskOrder = useCallback(params => {
    dispatch({
      type: "UPDATE_TASK_ORDER",
      payload: params,
    });
  }, []);

  const updateTaskArchive: UpdateTaskArchive = useCallback(params => {
    dispatch({
      type: "UPDATE_TASK_ARCHIVE",
      payload: params,
    });
  }, []);

  const deleteColumn: DeleteColumn = useCallback(id => {
    dispatch({
      type: "DELETE_COLUMN",
      payload: id,
    });
  }, []);

  const getColumns: GetColumns = useCallback(() => {
    return state.columnList.map(columnId => state.columns[columnId]);
  }, [state]);

  const getTask: GetTask = useCallback(
    id => {
      return state.tasks[id];
    },
    [state],
  );

  return (
    <Context.Provider
      value={{
        addColumn,
        addTask,
        updateColumn,
        updateTask,
        updateColumnOrder,
        updateTaskOrder,
        updateTaskArchive,
        deleteColumn,
        getColumns,
        getTask,
      }}
    >
      {children}
    </Context.Provider>
  );
};
