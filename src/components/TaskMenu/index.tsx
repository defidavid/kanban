import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MouseEventHandler, useCallback, useState } from "react";
import { TaskState } from "../../contexts/kanban/types";
import { CLOSED, OPEN, Status, taskStatusTextMap } from "../../constants/taskStatus";
import { useTranslation } from "react-i18next";

export default function TaskMenu({
  onEditTaskClick,
  onDeleteTaskClick,
  onChangeStatusClick,
  onArchiveTaskClick,
  task,
}: {
  onEditTaskClick: () => void;
  onDeleteTaskClick: () => void;
  onChangeStatusClick: (status: Status) => void;
  onArchiveTaskClick: () => void;
  task: TaskState;
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();

  const handleClick: MouseEventHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = useCallback(() => {
    setAnchorEl(null);
    onEditTaskClick();
  }, [onEditTaskClick]);

  const handleStatus = useCallback(() => {
    setAnchorEl(null);
    onChangeStatusClick(task.status === OPEN ? CLOSED : OPEN);
  }, [onChangeStatusClick, task]);

  const handleDelete = useCallback(() => {
    setAnchorEl(null);
    onDeleteTaskClick();
  }, [onDeleteTaskClick]);

  const handleArchive = useCallback(() => {
    setAnchorEl(null);
    onArchiveTaskClick();
  }, [onArchiveTaskClick]);

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
        <MenuItem onClick={handleEdit}>{t("words.EditTask")}</MenuItem>
        <MenuItem onClick={handleStatus}>
          {t("words.SetStatus")}: {task.status === OPEN ? taskStatusTextMap[CLOSED] : taskStatusTextMap[OPEN]}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleArchive}>{t("words.Archive")}</MenuItem>
        <MenuItem onClick={handleDelete}>{t("words.DeleteTask")}</MenuItem>
      </Menu>
    </div>
  );
}
