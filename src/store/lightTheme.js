import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7D3C98",
    },
    secondary: {
      main: "#983C40",
    },
    error: {
      main: "#dd4b39",
    },
    warning: {
      main: "#f39c12",
    },
    success: {
      main: "#1E8449",
    },
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});
