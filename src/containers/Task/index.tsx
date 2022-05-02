import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { ColumnId, TaskState } from "../../contexts/kanban/types";
import TaskMenu from "../../components/TaskMenu";
import { useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";
import EditTaskModal from "../EditTaskModal";
import { taskStatusTextMap } from "../../constants/taskStatus";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { TASK } from "../../constants/dnd";
import { useRef } from "react";

type DragItem = {
  index: number;
  task: TaskState;
  type: string;
};

export default function Task({
  task,
  parentColumnId,
  index,
}: {
  task: TaskState;
  parentColumnId: ColumnId;
  index: number;
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [editTaskOpen, setEditTaskOpen] = useState(false);

  const { deleteTask, updateTask, updateTaskArchive, updateTaskOrder } = useKanban();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: TASK,
      previewOptions: {
        offsetY: 100,
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
      item: () => {
        return {
          index,
          task,
        } as DragItem;
      },
    }),
    [],
  );

  const [, drop] = useDrop<DragItem, void, { canDrop: boolean; isOver: boolean }>({
    accept: TASK,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      updateTaskOrder({ columnId: parentColumnId, id: item.task.id, newOrderIndex: hoverIndex });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const onEditTaskClick = useCallback(() => setEditTaskOpen(true), []);

  const onCloseEditTask = useCallback(() => setEditTaskOpen(false), []);

  const onDeleteTaskClick = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask({ id: task.id, parentColumnId });
    }
  }, [deleteTask, task, parentColumnId]);

  const onChangeStatusClick = useCallback(
    status => {
      updateTask({ id: task.id, status });
    },
    [task, updateTask],
  );

  const onArchiveTaskClick = useCallback(() => {
    updateTaskArchive({ id: task.id, columnId: parentColumnId, archived: true });
  }, [task, updateTaskArchive, parentColumnId]);

  drag(drop(ref));

  return (
    <>
      <Card sx={{ margin: 1, marginBottom: 3, cursor: "move", opacity: isDragging ? 0.5 : 1 }} ref={ref}>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={
            <TaskMenu
              onChangeStatusClick={onChangeStatusClick}
              onArchiveTaskClick={onArchiveTaskClick}
              task={task}
              onEditTaskClick={onEditTaskClick}
              onDeleteTaskClick={onDeleteTaskClick}
            />
          }
          title={<Typography variant="body1">{task.name}</Typography>}
        />
        <CardContent sx={{ paddingBottom: "1 !important", paddingTop: 0 }}>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "0.5em !important",
            paddingTop: 0,
          }}
        >
          <Typography
            sx={{
              border: "1px solid",
              borderColor: "grey.800",
              paddingLeft: 2,
              paddingRight: 2,
              borderRadius: 1,
            }}
            variant="caption"
            color="textSecondary"
          >
            {taskStatusTextMap[task.status]}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(task.creationDatetime).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {editTaskOpen && <EditTaskModal task={task} onCloseClick={onCloseEditTask} />}
    </>
  );
}
