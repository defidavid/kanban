import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormEvent, useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "../../components/Dialog";
import { ColumnState } from "../../contexts/kanban/types";
import TaskDescriptionInput from "../../components/TaskDescriptionInput";
import TaskTitleInput from "../../components/TaskTitleInput";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  const buttonDisabled = !trimmedName || !trimmedDescription;

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
        {t("words.AddTask")}
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
          <TaskTitleInput value={name} onChange={value => setName(value)} />
        </DialogContent>
        <DialogContent>
          <TaskDescriptionInput value={description} onChange={value => setDescription(value)} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={buttonDisabled}>
            {t("words.CreateTask")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
