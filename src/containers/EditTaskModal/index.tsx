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
import { TaskState } from "../../contexts/kanban/types";

export default function EditTaskModal({
  onCloseClick,
  task,
}: {
  onCloseClick: () => void;
  task: TaskState;
}): JSX.Element {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const { updateTask } = useKanban();

  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  const buttonDisabled =
    !trimmedName || !trimmedDescription || (task.name === trimmedName && task.description === trimmedDescription);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!buttonDisabled) {
        updateTask({ id: task.id, name: name.trim(), description: description.trim() });
        onCloseClick();
      }
    },
    [name, updateTask, buttonDisabled, onCloseClick, task, description],
  );

  return (
    <Dialog onClose={onCloseClick} open>
      <DialogTitle>
        Update task
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
            label="Task name"
            inputProps={{ maxLength: 50 }}
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
            inputProps={{ maxLength: 256 }}
            rows={4}
            onChange={(e: React.ChangeEvent) => setDescription((e.target as HTMLTextAreaElement).value)}
            value={description}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={buttonDisabled}>
            Update task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
