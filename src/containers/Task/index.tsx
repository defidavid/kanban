import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import { ColumnId, TaskState } from "../../contexts/kanban/types";
import { OPEN, CLOSED } from "../../constants/taskStatus";
import TaskMenu from "../../components/TaskMenu";
import { useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";

const taskStatusTextMap = {
  [OPEN]: "Open",
  [CLOSED]: "Closed",
};

export default function Task({ task, parentColumnId }: { task: TaskState; parentColumnId: ColumnId }): JSX.Element {
  const [editTaskOpen, setEditTaskOpen] = useState(false);

  const { deleteTask } = useKanban();

  const onEditTaskClick = useCallback(() => setEditTaskOpen(true), []);
  const onDeleteTaskClick = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask({ id: task.id, parentColumnId });
    }
  }, [deleteTask, task, parentColumnId]);

  return (
    <>
      <Card sx={{ margin: 1 }}>
        <CardHeader
          sx={{ paddingBottom: 0 }}
          action={<TaskMenu onEditTaskClick={onEditTaskClick} onDeleteTaskClick={onDeleteTaskClick} />}
          title={<Typography>{task.name}</Typography>}
        />
        <CardContent sx={{ paddingBottom: "1 !important", paddingTop: 0 }}>
          <Typography color="textSecondary">{task.description}</Typography>
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
            variant="subtitle2"
            color="textSecondary"
          >
            {taskStatusTextMap[task.status]}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Jan. 26 1982
          </Typography>
        </CardContent>
      </Card>
      {editTaskOpen && "adf"}
    </>
  );
}
