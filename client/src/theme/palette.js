// src/theme/palette.js

const PRIMARY = {
  main: "#3366FF",
  contrastText: "#ffffff",
};

const SECONDARY = {
  main: "#FFC107",
  contrastText: "#000000",
};

const INFO = {
  main: "#1890FF",
  contrastText: "#ffffff",
};

const SUCCESS = {
  main: "#54D62C",
  dark: "#229A16",
  contrastText: "#000000",
};

const WARNING = {
  main: "#F77F00",
  contrastText: "#000000",
};

const ERROR = {
  main: "#D62828",
  contrastText: "#ffffff",
};

const palette = {
  mode: "light", // still required by MUI internally

  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,

  background: {
    default: "#1f1f1f",
    paper: "#ffffff",
  },

  text: {
    primary: "#ffffff",
    secondary: "#555555",
  },
};

export default palette;
