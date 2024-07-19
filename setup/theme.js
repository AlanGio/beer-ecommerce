import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#FF9F24",
    },
    secondary: {
      main: "#0F0D23",
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "24px",
      color: "#323232",
    },
    h3: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "23px",
      color: "#323232",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "21px",
      color: "#646464",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FAFAFA",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF9F24",
          color: "white",
        },
      },
    },
  },
};

export const theme = createTheme({
  ...themeOptions,
});
