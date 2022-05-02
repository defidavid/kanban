import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColumnState } from "../../contexts/kanban/types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import EditColumnModal from "../EditColumnModal";
import useKanban from "../../hooks/useKanban";
import AddTaskModal from "../AddTaskModal";
import ColumnMenu from "../../components/ColumnMenu";
import Task from "../Task";

export default function Column({ column }: { column: ColumnState }): JSX.Element {
  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const { deleteColumn, getTask } = useKanban();

  const onEditColumnClick = useCallback(() => setEditColumnOpen(true), []);
  const onCloseEditColumn = useCallback(() => setEditColumnOpen(false), []);
  const onCloseAddTask = useCallback(() => setAddTaskOpen(false), []);
  const onDeleteColumnClick = useCallback(() => {
    const msg =
      column.taskList.length || column.archivedTaskList.length > 0
        ? `This action will remove any cards, including archived, associated with the column. \n
    Are you sure you want to delete this column?`
        : "Are you sure you want to delete this column?";

    if (window.confirm(msg)) {
      deleteColumn(column.id);
    }
  }, [deleteColumn, column]);

  return (
    <>
      <Box
        sx={{
          padding: 1,
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: 355,
            borderRadius: 1,
            padding: 2,
            backgroundColor: "common.black",
            border: "1px solid",
            borderColor: "grey.800",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" overflow="hidden" alignItems="center" pl={1}>
              <Typography
                borderRadius={10}
                mr={2}
                pr={1.5}
                pl={1.5}
                sx={{
                  backgroundColor: "grey.800",
                  display: "flex",
                  alignItems: "end",
                }}
                minWidth="1.5em"
                lineHeight="1.5em"
                textAlign="center"
              >
                {column.taskList.length}
              </Typography>
              <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} variant="h6">
                <span title={column.name}>{column.name}</span>
              </Typography>
            </Box>
            <Box display="flex">
              <IconButton
                onClick={() => {
                  setAddTaskOpen(true);
                }}
              >
                <AddIcon />
              </IconButton>
              <ColumnMenu
                column={column}
                onDeleteColumnClick={onDeleteColumnClick}
                onEditColumnClick={onEditColumnClick}
              />
            </Box>
          </Box>
          {column.taskList.map(taskId => {
            const task = getTask(taskId);
            return <Task parentColumnId={column.id} task={task} key={taskId} />;
          })}
        </Box>
      </Box>
      {editColumnOpen && <EditColumnModal column={column} onCloseClick={onCloseEditColumn} />}
      {addTaskOpen && <AddTaskModal column={column} onCloseClick={onCloseAddTask} />}
    </>
  );
}
