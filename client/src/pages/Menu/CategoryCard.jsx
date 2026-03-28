import React, { useMemo } from "react";
import { colors } from "../../Assets/colors";
import { Box, Grid, Typography } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

function CategoryCard({ catergory, imoji, selected, onSelect }) {
  const bgColor = useMemo(() => {
    let num = Math.floor(Math.random() * 10);
    return colors[num];
  }, []);

  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={bgColor}
      borderRadius={2}
      padding={1}
      height={"10vh"}
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        border: selected ? "1px solid #fff" : "2px solid transparent",
      }}
      //   width={"25%"}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{imoji}</Typography>
          <Typography>{catergory}</Typography>
        </Box>
        {selected && (
          <Box sx={{ display: "flex" }}>
            <AdjustIcon sx={{ mb: 0 }} />
          </Box>
        )}
      </Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "flex-Start",
          ml: 1,
        }}
      >
        <Typography>6 Items</Typography>
      </Grid>
    </Grid>
  );
}

export default CategoryCard;
