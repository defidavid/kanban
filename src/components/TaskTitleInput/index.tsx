import TextField from "@mui/material/TextField";

export default function TaskTitleInput({
  value,
  onChange,
  label = "Task name",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}): JSX.Element {
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
