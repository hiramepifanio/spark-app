import { createTheme } from "@mui/material/styles";
import { theme } from "./theme";

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: theme.palette.primary },
    secondary: { main: theme.palette.secondary },
    background: { default: theme.palette.background },
    text: { primary: theme.palette.text },
  },
  typography: {
    fontFamily: theme.typography.fontFamily,
  },
});