import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => navigate(-1)}>
      <KeyboardBackspaceIcon />
    </Button>
  );
}

export default BackButton;
