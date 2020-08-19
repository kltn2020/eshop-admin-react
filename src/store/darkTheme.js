import { createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#96191F",
    },
    secondary: {
      main: "#C83F68",
    },
    type: "dark",
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});
