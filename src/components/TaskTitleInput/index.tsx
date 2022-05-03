import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

export default function TaskTitleInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}): JSX.Element {
  const { t } = useTranslation();
  label = label || t("words.TaskName");

  return (
    <TextField
      fullWidth
      required
      label={label}
      inputProps={{ maxLength: 50 }}
      autoFocus
      onChange={(e: React.ChangeEvent) => onChange((e.target as HTMLTextAreaElement).value)}
      value={value}
    />
  );
}
