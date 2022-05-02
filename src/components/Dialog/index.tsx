import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import useWindowBreakpoint from "../../hooks/useWindowBreakpoint";

const _Dialog = function (props: DialogProps) {
  const bp = useWindowBreakpoint();
  return <MuiDialog transitionDuration={0} fullScreen={bp === "xs"} {...props} />;
};

export const Dialog = styled(_Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: 500,
    maxWidth: "none",
  },
}));
