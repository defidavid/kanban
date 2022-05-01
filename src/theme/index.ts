import { Theme, createTheme as createMuiTheme } from "@mui/material/styles";
import { Size } from "./types";

export default function createTheme(size: Size): Theme {
  const sizeMapping = {
    xs: {
      SPACING: 3,
      FONT_SIZE: "11px",
    },
    sm: {
      SPACING: 4,
      FONT_SIZE: "13px",
    },
    md: {
      SPACING: 5,
      FONT_SIZE: "14px",
    },
    lg: {
      SPACING: 5,
      FONT_SIZE: "16px",
    },
  };

  const { SPACING } = sizeMapping[size];

  return createMuiTheme({
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 600,
    //     md: 960,
    //     lg: 1280,
    //     xl: 1680,
    //   },
    // },
    components: {},
    palette: {},
    typography: {},
    shape: {},
    spacing: SPACING,
  });
}
