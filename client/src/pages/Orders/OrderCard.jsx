import React from "react";
import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { alpha } from "@mui/material/styles";

function OrderCard({ user, amount, stat }) {
  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={"#262626"}
      borderRadius={2}
      padding={2}
    >
      <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography>{user}</Typography>
            <Typography variant="caption">#1011 / Dine in</Typography>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
        >
          <Chip
            icon={<DoneAllIcon />}
            label="Ready"
            sx={{
              backgroundColor: "#54D62C33",
              color: "#54D62C",
              "& .MuiChip-icon": {
                color: "#54D62C",
              },
            }}
          />
          <Typography variant="caption">Ready to Serve</Typography>
        </Box>
      </Grid>
      <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="caption">March 26, 2026 02:26 PM</Typography>
        </Box>
        <Box>
          <Typography variant="caption"> 3 Items </Typography>
        </Box>
      </Grid>
      <Divider
        sx={{
          width: "100%",
          borderColor: "#424242",
          borderBottomWidth: 3,
        }}
      />
      <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {" "}
          <Typography>Total</Typography>{" "}
        </Box>
        <Box>
          {" "}
          <Typography>$ 49.50</Typography>{" "}
        </Box>
      </Grid>
    </Grid>
  );
}

export default OrderCard;
