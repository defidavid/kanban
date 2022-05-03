import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function EmptyBoard({ onClick }: { onClick: () => void }): JSX.Element {
  const { t } = useTranslation();

  return (
    <Box display="flex" pt={15} margin={"0 auto"} alignItems="center" flexDirection="column">
      <Typography variant="h5" color="textSecondary" textAlign="center">
        {t("messages.EmptyBoard")}
      </Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={onClick}>
          {t("words.AddColumn")}
        </Button>
      </Box>
    </Box>
  );
}
