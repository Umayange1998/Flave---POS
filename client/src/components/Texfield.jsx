import { TextField } from "@mui/material";
import React from "react";

function Texfield() {
  return (
    <TextField
      size="small"
      id="outlined-search"
      placeholder="Search..."
      type="search"
      fullWidth
      sx={{
        pl: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // default
          },
          "&:hover fieldset": {
            border: "none", // hover
          },
          "&.Mui-focused fieldset": {
            border: "none", // active/focus
          },
        },
      }}
    />
  );
}

export default Texfield;
