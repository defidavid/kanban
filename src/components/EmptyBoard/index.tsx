import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EmptyBoard({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <Box display="flex" pt={15} margin={"0 auto"} alignItems="center" flexDirection="column">
      <Typography variant="h5" color="textSecondary">
        This project does not have any columns or cards.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={onClick}>
          Add a column
        </Button>
      </Box>
    </Box>
  );
}
