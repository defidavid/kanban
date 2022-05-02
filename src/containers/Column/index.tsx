import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColumnState } from "../../contexts/kanban/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MouseEventHandler, useCallback, useState } from "react";
import EditColumnModal from "../EditColumnModal";
import useKanban from "../../hooks/useKanban";
import AddTaskModal from "../AddTaskModal";
import { CardHeader } from "@mui/material";
import { OPEN, CLOSED } from "../../constants/taskStatus";

const taskStatusTextMap = {
  [OPEN]: "Open",
  [CLOSED]: "Closed",
};

function ColumnMenu({
  onEditColumnClick,
  onDeleteColumnClick,
}: {
  onEditColumnClick: () => void;
  onDeleteColumnClick: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick: MouseEventHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = useCallback(() => {
    setAnchorEl(null);
    onEditColumnClick();
  }, [onEditColumnClick]);

  const handleDelete = useCallback(() => {
    setAnchorEl(null);
    onDeleteColumnClick();
  }, [onDeleteColumnClick]);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit column</MenuItem>
        <MenuItem onClick={handleDelete}>Delete column</MenuItem>
      </Menu>
    </div>
  );
}

export default function Column({ column }: { column: ColumnState }): JSX.Element {
  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const { deleteColumn, getTask } = useKanban();

  const onEditColumnClick = useCallback(() => setEditColumnOpen(true), []);
  const onCloseEditColumn = useCallback(() => setEditColumnOpen(false), []);
  const onCloseAddTask = useCallback(() => setAddTaskOpen(false), []);
  const onDeleteColumnClick = useCallback(() => {
    if (
      window.confirm(
        "This action will remove any cards and automation preset associated with the column. Are you sure you want to delete this column?",
      )
    ) {
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
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                variant="subtitle1"
              >
                <span title={column.name}>{column.name}</span>
              </Typography>
            </Box>
            <Box display="flex">
              <IconButton>
                <AddIcon
                  onClick={() => {
                    setAddTaskOpen(true);
                  }}
                />
              </IconButton>
              <ColumnMenu onDeleteColumnClick={onDeleteColumnClick} onEditColumnClick={onEditColumnClick} />
            </Box>
          </Box>
          {column.taskList.map(taskId => {
            const task = getTask(taskId);
            return (
              <Card sx={{ margin: 1 }} key={taskId}>
                <CardHeader
                  sx={{ paddingBottom: 0 }}
                  action={
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  }
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
            );
          })}
        </Box>
      </Box>
      {editColumnOpen && <EditColumnModal column={column} onCloseClick={onCloseEditColumn} />}
      {addTaskOpen && <AddTaskModal column={column} onCloseClick={onCloseAddTask} />}
    </>
  );
}
