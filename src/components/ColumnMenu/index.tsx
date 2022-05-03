import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MouseEventHandler, useCallback, useState } from "react";
import { ColumnState } from "../../contexts/kanban/types";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

export default function ColumnMenu({
  onEditColumnClick,
  onDeleteColumnClick,
  column,
}: {
  onEditColumnClick: () => void;
  onDeleteColumnClick: () => void;
  column: ColumnState;
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();

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
        <MenuItem onClick={handleEdit}>{t("words.EditColumn")}</MenuItem>
        {!column.taskList.length && <Divider />}
        {!column.taskList.length && <MenuItem onClick={handleDelete}>{t("words.DeleteColumn")}</MenuItem>}
      </Menu>
    </div>
  );
}
