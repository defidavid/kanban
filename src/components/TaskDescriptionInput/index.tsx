import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslation } from "react-i18next";

const MAX_DESCRIPTION_LENGTH = 256;

export default function TaskDescriptionInput({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}): JSX.Element {
  const { t } = useTranslation();
  const trimmedDescription = value.trim();

  return (
    <>
      <TextField
        fullWidth
        label={t("words.Description")}
        inputProps={{ maxLength: 256 }}
        multiline
        required
        rows={4}
        onChange={(e: React.ChangeEvent) => onChange((e.target as HTMLTextAreaElement).value)}
        value={value}
      />
      <FormHelperText>{`${t("words.CharactersRemaining")}: ${
        MAX_DESCRIPTION_LENGTH - trimmedDescription.length
      }`}</FormHelperText>
    </>
  );
}
