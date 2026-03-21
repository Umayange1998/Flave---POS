// src/theme/palette.js

const PRIMARY = {
  main: "#3366FF",
  contrastText: "#ffffff",
};

const SECONDARY = {
  main: "#FCBF49",
  contrastText: "#000000",
};

const INFO = {
  main: "#1890FF",
  contrastText: "#ffffff",
};

const SUCCESS = {
  main: "#54D62C",
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
    default: "#003049",
    paper: "#ffffff",
  },

  text: {
    primary: "#000000",
    secondary: "#555555",
  },
};

export default palette;
