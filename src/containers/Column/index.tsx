import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColumnState } from "../../contexts/kanban/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEventHandler, useCallback, useState } from "react";
import EditColumnModal from "../EditColumnModal";
import useKanban from "../../hooks/useKanban";

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
  const { deleteColumn } = useKanban();

  const onEditColumnClick = useCallback(() => setEditColumnOpen(true), []);
  const onCloseEditColumn = useCallback(() => setEditColumnOpen(false), []);
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
            <Box display="flex" alignItems="center" pl={2}>
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
              <Typography sx={{ textOverflow: "ellipsis" }} variant="subtitle1">
                {column.name}
              </Typography>
            </Box>
            <ColumnMenu onDeleteColumnClick={onDeleteColumnClick} onEditColumnClick={onEditColumnClick} />
          </Box>
        </Box>
      </Box>
      {editColumnOpen && <EditColumnModal column={column} onCloseClick={onCloseEditColumn} />}
    </>
  );
}
