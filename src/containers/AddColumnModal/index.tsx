import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormEvent, useCallback, useState } from "react";
import useKanban from "../../hooks/useKanban";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "../../components/Dialog";
import TaskTitleInput from "../../components/TaskTitleInput";
import { useTranslation } from "react-i18next";

export default function AddColumnModal({ onCloseClick }: { onCloseClick: () => void }): JSX.Element {
  const [name, setName] = useState("");
  const { addColumn } = useKanban();

  const { t } = useTranslation();

  const buttonDisabled = !name.trim();

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!buttonDisabled) {
        addColumn({ name: name.trim() });
        onCloseClick();
      }
    },
    [name, addColumn, buttonDisabled, onCloseClick],
  );

  return (
    <Dialog onClose={onCloseClick} open>
      <DialogTitle>
        {t("words.AddColumn")}
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
            {t("words.CreateColumn")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
