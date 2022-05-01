import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { BreakPoint } from "./types";

export default function useWindowBreakpoint(): BreakPoint {
  const theme = useTheme();
  const bps = [
    useMediaQuery(theme.breakpoints.down("sm")),
    useMediaQuery(theme.breakpoints.down("md")),
    useMediaQuery(theme.breakpoints.down("lg")),
    useMediaQuery(theme.breakpoints.down("xl")),
  ];
  if (bps[0]) return "xs";
  if (bps[1]) return "sm";
  if (bps[2]) return "md";
  return "lg";
}
