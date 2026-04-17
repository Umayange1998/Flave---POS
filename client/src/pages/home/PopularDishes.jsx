import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { popular_dishes } from "../../Assets/menu";
function PopularDishes() {
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Popular Dishes</Typography>
        <Link href="#" underline="none">
          {"View All"}
        </Link>
      </Box>
      <Box
        sx={{
          maxHeight: "calc(70vh - 20px)",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {popular_dishes.map((dish) => {
          return (
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
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>{dish._id} </Typography>{" "}
                </Box>
                <Box
                  component="img"
                  src={dish.image}
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

                <Box>
                  <Typography>{dish.name} </Typography>{" "}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PopularDishes;
