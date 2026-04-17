import React from "react";
import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AdjustIcon from "@mui/icons-material/Adjust";

function OrderCard({ order, index }) {
  const getInitial = (order) => {
    const name = order.customerDetails.name;

    let initial = "AM";

    if (name) {
      const words = name.trim().split(" ");

      if (words.length >= 2) {
        // Take first letter of first two words
        initial = words[0][0].toUpperCase() + words[1][0].toUpperCase();
      } else {
        // Only one word → take first 2 letters
        initial = words[0].slice(0, 2).toUpperCase();
      }
    }

    return { initial, name };
  };
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
            {getInitial(order).initial}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography>{order.customerDetails.name}</Typography>
            <Typography variant="caption">#10{index} / Dine in</Typography>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
        >
          {order.orderStatus === "preparing" ? (
            <Chip
              icon={<AdjustIcon />}
              label="Preparing"
              sx={{
                backgroundColor: "#FFA72633",
                color: "#FFA726",
                "& .MuiChip-icon": {
                  color: "#FFA726",
                },
              }}
            />
          ) : order.orderStatus === "Ready" ? (
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
          ) : null}
          {order.orderStatus === "preparing" ? (
            <Typography variant="caption">Order In Progress</Typography>
          ) : order.orderStatus === "ready" ? (
            <Typography variant="caption">Ready to Serve</Typography>
          ) : null}
        </Box>
      </Grid>
      <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="caption">{order.orderDate}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            {" "}
            {order.items.length} Items{" "}
          </Typography>
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
          <Typography>$ {order.bills.total}</Typography>{" "}
        </Box>
      </Grid>
    </Grid>
  );
}

export default OrderCard;
