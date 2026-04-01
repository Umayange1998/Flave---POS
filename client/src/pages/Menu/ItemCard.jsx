import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

function ItemCard({ price, name, onClick }) {
  const [itemcount, setItemcount] = useState(0);

  function increase() {
    if (itemcount < 6) {
      setItemcount((prev) => prev + 1);
    }
  }
  function decrease() {
    if (itemcount > 0) {
      setItemcount((prev) => prev - 1);
    }
  }
  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={"#424242"}
      borderRadius={2}
      padding={1}
      minHeight={"15vh"}
      flexDirection={"column"}
      justifyContent="space-between"
      px={3}
      //   width={"25%"}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
        <Typography textAlign={"start"}>{name}</Typography>
        <IconButton
          sx={{
            backgroundColor: "#54D62C33",
            color: "#54D62C",
            "& .MuiChip-icon": {
              color: "#54D62C",
            },
            borderRadius: 2,
            height: "30px",
            width: "30px",
          }}
          onClick={() => {
            onClick(itemcount);
            setItemcount(0);
          }}
        >
          <AddShoppingCartRoundedIcon />
        </IconButton>
        {/* </Box> */}
      </Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 1,
          py: 0,
          height: "30%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Typography>{price}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#262626",
            gap: 1,
            px: 1,
            py: 0,
          }}
        >
          <IconButton
            sx={{ height: "20px", width: "20px" }}
            onClick={() => decrease()}
          >
            <RemoveIcon color="secondary" />
          </IconButton>
          <Typography>{itemcount}</Typography>
          <IconButton
            sx={{ height: "20px", width: "20px" }}
            onClick={() => increase()}
          >
            <AddIcon color="secondary" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ItemCard;
