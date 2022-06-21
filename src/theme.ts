import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "#212121",
    },
  },
});

export default theme;
