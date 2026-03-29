import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function CutomerDetail() {
  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "anchor-center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="body2">Couctomer Name</Typography>
          <Typography variant="caption">#101/ Dine in</Typography>
          <Typography variant="caption">Date, time</Typography>
        </Box>
        <Box
          backgroundColor="#F77F00"
          sx={{
            borderRadius: "50%",

            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          US
        </Box>{" "}
      </Grid>
    </Grid>
  );
}

export default CutomerDetail;
