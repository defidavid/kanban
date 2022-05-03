import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Trans, useTranslation } from "react-i18next";

export default function NoMatch() {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" flexDirection="column" pt={25} width="100%" height="100%">
      <Typography variant="h1">404</Typography>
      <Typography color="textSecondary" variant="h4">
        {t("messages.Lost")}
      </Typography>
      <Typography variant="h4">
        <Trans i18nKey="messages.Help">
          Let me <Link href="/">help</Link> you :)
        </Trans>
      </Typography>
    </Box>
  );
}
