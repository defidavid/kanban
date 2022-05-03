import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

export default function EmptyBoard({ onClick }: { onClick: () => void }): JSX.Element {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Box display="flex" pt={15} pr={20} pl={20} margin={"0 auto"} alignItems="center" flexDirection="column">
      <Typography variant="h5" color="textSecondary" textAlign="center">
        {t("messages.EmptyBoard")}
      </Typography>
      <Box mt={4}>
        <Button ref={ref} variant="contained" onClick={onClick}>
          {t("words.AddColumn")}
        </Button>
      </Box>
    </Box>
  );
}
