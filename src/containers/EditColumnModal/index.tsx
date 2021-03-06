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
import TaskTitleInput from "../../components/TaskTitleInput";
import { useTranslation } from "react-i18next";

export default function EditColumnModal({
  onCloseClick,
  column,
}: {
  onCloseClick: () => void;
  column: ColumnState;
}): JSX.Element {
  const [name, setName] = useState(column.name);
  const { updateColumn } = useKanban();

  const buttonDisabled = !name.trim();

  const { t } = useTranslation();

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!buttonDisabled) {
        updateColumn({ id: column.id, name: name.trim() });
        onCloseClick();
      }
    },
    [name, updateColumn, buttonDisabled, onCloseClick, column],
  );

  return (
    <Dialog onClose={onCloseClick} open>
      <DialogTitle>
        {t("words.EditColumn")}
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
          <TaskTitleInput label={t("words.ColumnName")} onChange={value => setName(value)} value={name} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={buttonDisabled}>
            {t("words.UpdateColumn")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
