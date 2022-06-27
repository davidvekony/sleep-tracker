import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFE5B4",
    },
    background: {
      default: "#1F4690",
      paper: "#3A5BA0",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
});

export default theme;
