import React from "react";
import { Box, Typography } from "@mui/material";

function Minicard({ title, icon, amount, stat }) {
  return (
    <Box sx={{ background: "#262626", borderRadius: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        {icon}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: 1,
        }}
      >
        <Typography variant="h5">{amount}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography>
            <span style={{ color: "#54D62C" }}>{stat}%</span> than yesterday
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Minicard;
