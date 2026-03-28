import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function CartItem() {
  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={"#424242"}
      borderRadius={2}
      padding={2}
      minHeight={"20vh"}
      mx={2}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography>name</Typography>
        </Box>
        <Box></Box>
      </Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 1,
        }}
      ></Grid>
    </Grid>
  );
}

export default CartItem;
