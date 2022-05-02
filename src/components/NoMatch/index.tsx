import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NoMatch() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" pt={25} width="100%" height="100%">
      <Typography variant="h1">404</Typography>
      <Typography color="textSecondary" variant="h4">
        Are you lost?
      </Typography>
      <Typography variant="h4">
        Let me <Link href="/">help</Link> you :)
      </Typography>
    </Box>
  );
}
