import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import { ColumnId, TaskState } from "../../contexts/kanban/types";
import TaskMenu from "../../components/TaskMenu";
import { useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";
import EditTaskModal from "../EditTaskModal";
import { taskStatusTextMap } from "../../constants/taskStatus";

export default function Task({ task, parentColumnId }: { task: TaskState; parentColumnId: ColumnId }): JSX.Element {
  const [editTaskOpen, setEditTaskOpen] = useState(false);

  const { deleteTask, updateTask, updateTaskArchive } = useKanban();

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

  return (
    <>
      <Card sx={{ margin: 1 }}>
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
