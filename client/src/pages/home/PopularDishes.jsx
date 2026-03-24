import React from "react";
import { Box, Link, Typography } from "@mui/material";
import Cheese_pizza from "../../Assets/Cheese_pizza.webp";

function PopularDishes() {
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>Popular Dishes</Typography>
        <Link href="#" underline="none">
          {"View All"}
        </Link>
      </Box>
      <Box
        sx={{
          background: "#424242",
          py: 1,
          px: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <Box>
            <Typography>01 </Typography>{" "}
          </Box>
          <Box
            component="img"
            src={Cheese_pizza}
            sx={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PopularDishes;
