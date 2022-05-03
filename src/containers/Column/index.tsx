import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColumnState } from "../../contexts/kanban/types";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useCallback, useEffect, useRef, useState } from "react";
import EditColumnModal from "../EditColumnModal";
import useKanban from "../../hooks/useKanban";
import AddTaskModal from "../AddTaskModal";
import ColumnMenu from "../../components/ColumnMenu";
import Task from "../Task";
import { COLUMN, TASK } from "../../constants/dnd";
import { TaskDragItem } from "../Task/types";
import useWindowBreakpoint from "../../hooks/useWindowBreakpoint";
import { useTranslation } from "react-i18next";

type ColumnDragItem = {
  column: ColumnState;
  index: number;
  type: string;
};

export default function Column({ column, index }: { column: ColumnState; index: number }): JSX.Element {
  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const addColumnButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (addColumnButtonRef.current) {
      addColumnButtonRef.current.focus();
    }
  }, []);

  const bp = useWindowBreakpoint();

  const { deleteColumn, getTask, moveTask, updateColumnOrder } = useKanban();

  const { t } = useTranslation();

  const onEditColumnClick = useCallback(() => setEditColumnOpen(true), []);
  const onCloseEditColumn = useCallback(() => setEditColumnOpen(false), []);
  const onCloseAddTask = useCallback(() => setAddTaskOpen(false), []);
  const onDeleteColumnClick = useCallback(() => {
    const msg =
      column.taskList.length || column.archivedTaskList.length > 0
        ? t("messages.ConfirmColumnDelete1")
        : t("messages.ConfirmColumnDelete2");

    if (window.confirm(msg)) {
      deleteColumn(column.id);
    }
  }, [deleteColumn, column, t]);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<ColumnDragItem, void, { isDragging: boolean }>({
    type: COLUMN,
    item: {
      index,
      column,
    } as ColumnDragItem,
    isDragging: monitor => {
      return column.id === monitor.getItem().column.id;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, taskDrop] = useDrop<TaskDragItem>({
    accept: [TASK],
    hover(item: TaskDragItem) {
      if (!ref.current) {
        return;
      }

      if (column.id !== item.parentColumnId) {
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

  const [, columnDrop] = useDrop<ColumnDragItem>({
    accept: [COLUMN],
    hover(item: ColumnDragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;

      const hoverIndex = index;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.right;

      // Dragging rightwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging leftwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      updateColumnOrder({ id: item.column.id, newOrderIndex: hoverIndex });

      item.index = hoverIndex;
    },
  });

  drag(taskDrop(columnDrop(ref)));

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
          height: "100%",
          paddingRight: 3,
          opacity: isDragging ? 0 : 1,
        }}
      >
        <Box
          ref={ref}
          sx={{
            height: "100%",
            width: {
              xs: "100%",
              sm: 355,
              md: 355,
              lg: 355,
              xl: 355,
            },
            borderRadius: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
            padding: { xs: 1, sm: 2, md: 2, lg: 2, xl: 2 },
            backgroundColor: "common.black",
            border: "1px solid",
            // borderColor: "grey.800",
            borderColor: { xs: "transparent", sm: "grey.800", md: "grey.800", lg: "grey.800", xl: "grey.800" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" overflow="hidden" alignItems="center" pl={1}>
              {bp !== "xs" && (
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
              )}
              {bp !== "xs" && (
                <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} variant="h6">
                  <span title={column.name}>{column.name}</span>
                </Typography>
              )}
            </Box>
            <Box display="flex">
              <IconButton
                ref={addColumnButtonRef}
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
            {!column.taskList.length && (
              <Box mt={4} p={7} textAlign="center">
                <Link
                  onClick={() => {
                    setAddTaskOpen(true);
                  }}
                  textAlign="center"
                  color="textSecondary"
                  variant="body1"
                  component="button"
                >
                  {t("messages.EmptyColumn1")}
                </Link>
                <Typography color="textSecondary">{t("messages.EmptyColumn2")}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {editColumnOpen && <EditColumnModal column={column} onCloseClick={onCloseEditColumn} />}
      {addTaskOpen && <AddTaskModal column={column} onCloseClick={onCloseAddTask} />}
    </>
  );
}
