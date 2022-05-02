import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
export default function AddColumnCard({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <Box
      sx={{
        padding: 1,
        paddingRight: 3,
      }}
    >
      <ButtonBase
        sx={[
          {
            width: 355,
            borderRadius: 1,
            padding: 10,
            border: "1px dashed",
            borderColor: "grey.700",
          },
          {
            "&:hover, &:focus": {
              border: "1px solid",
            },
          },
        ]}
        onClick={onClick}
      >
        <Typography>&#x2b; Add column</Typography>
      </ButtonBase>
    </Box>
  );
}
