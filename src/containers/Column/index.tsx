import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColumnState } from "../../contexts/kanban/types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useDrop } from "react-dnd";
import { useCallback, useRef, useState } from "react";
import EditColumnModal from "../EditColumnModal";
import useKanban from "../../hooks/useKanban";
import AddTaskModal from "../AddTaskModal";
import ColumnMenu from "../../components/ColumnMenu";
import Task from "../Task";
import { TASK } from "../../constants/dnd";
import { DragItem } from "../Task/types";

export default function Column({ column }: { column: ColumnState }): JSX.Element {
  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const { deleteColumn, getTask, moveTask } = useKanban();

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

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: TASK,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }

      if (item.parentColumnId !== column.id) {
        // Switching columns
        moveTask({
          id: item.task.id,
          fromColumnId: item.parentColumnId,
          toColumnId: column.id,
          orderIndex: column.taskList.length,
        });
        item.parentColumnId = column.id;
      }
    },
  });

  drop(ref);

  return (
    <>
      <Box
        sx={{
          padding: 1,
          height: "100%",
          paddingRight: 3,
        }}
      >
        <Box
          ref={ref}
          sx={{
            height: "100%",
            width: 355,
            borderRadius: 1,
            padding: 2,
            backgroundColor: "common.black",
            border: "1px solid",
            borderColor: "grey.800",
            display: "flex",
            flexDirection: "column",
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
          <Box overflow="auto" pt={1}>
            {column.taskList.map((taskId, i) => {
              const task = getTask(taskId);
              return <Task index={i} parentColumnId={column.id} task={task} key={taskId} />;
            })}
          </Box>
        </Box>
      </Box>
      {editColumnOpen && <EditColumnModal column={column} onCloseClick={onCloseEditColumn} />}
      {addTaskOpen && <AddTaskModal column={column} onCloseClick={onCloseAddTask} />}
    </>
  );
}
