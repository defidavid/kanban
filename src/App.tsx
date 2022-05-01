import CssBaseline from "@mui/material/CssBaseline";
import { useMemo } from "react";
import Providers from "./contexts";
import useWindowBreakpoint from "./hooks/useWindowBreakpoint";
import createTheme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./components/AppContainer";

export default function App(): JSX.Element {
  const bp = useWindowBreakpoint();
  const theme = useMemo(() => {
    return createTheme(bp);
  }, [bp]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Providers>
          <AppContainer />
        </Providers>
      </Router>
    </ThemeProvider>
  );
}
