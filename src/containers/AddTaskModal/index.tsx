import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormEvent, useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "../../components/Dialog";
import { ColumnState } from "../../contexts/kanban/types";

export default function AddTaskModal({
  onCloseClick,
  column,
}: {
  onCloseClick: () => void;
  column: ColumnState;
}): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useKanban();

  const buttonDisabled = !name.trim() || !description;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!buttonDisabled) {
        addTask({ columnId: column.id, name: name.trim(), description: description.trim() });
        onCloseClick();
      }
    },
    [name, addTask, buttonDisabled, onCloseClick, column, description],
  );

  return (
    <Dialog onClose={onCloseClick} open>
      <DialogTitle>
        Add a task
        <IconButton
          aria-label="close"
          onClick={onCloseClick}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Column name"
            autoFocus
            onChange={(e: React.ChangeEvent) => setName((e.target as HTMLTextAreaElement).value)}
            value={name}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            onChange={(e: React.ChangeEvent) => setDescription((e.target as HTMLTextAreaElement).value)}
            value={description}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={buttonDisabled}>
            Create task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
