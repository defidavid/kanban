import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MouseEventHandler, useCallback, useState } from "react";

export default function TaskMenu({
  onEditTaskClick,
  onDeleteTaskClick,
}: {
  onEditTaskClick: () => void;
  onDeleteTaskClick: () => void;
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick: MouseEventHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = useCallback(() => {
    setAnchorEl(null);
    onEditTaskClick();
  }, [onEditTaskClick]);

  const handleDelete = useCallback(() => {
    setAnchorEl(null);
    onDeleteTaskClick();
  }, [onDeleteTaskClick]);

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
        <MenuItem onClick={handleEdit}>Edit task</MenuItem>
        <MenuItem onClick={handleEdit}>Set Status: closed</MenuItem>
        <MenuItem onClick={handleDelete}>Delete task</MenuItem>
      </Menu>
    </div>
  );
}
