import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { menuList } from "../../Assets/menu.js";
import CategoryCard from "./CategoryCard";
import { food_list } from "../../Assets/menu.js";
import ItemCard from "./ItemCard.jsx";
import CutomerDetail from "./CutomerDetail.jsx";
import CartItem from "./CartItem.jsx";

function Menu() {
  const [selectedCategory, setSelectedCategory] = React.useState("Mains");
  return (
    <Grid container spacing={6} sx={{ mt: "80px", px: 5 }}>
      <Grid size={9} sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
              }}
            >
              <BackButton />
              <Typography variant="h5">Menu</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                {" "}
                <LocalDiningIcon sx={{ width: 40, height: 40 }} />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography>Costomer Name</Typography>
                <Typography variant="caption">Table 01</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          size={12}
          maxHeight={"25vh"}
          overflow={"auto"}
          sx={{
            pt: 2,
            pb: 2,
            scrollbarWidth: "none",
          }}
        >
          <Grid container spacing={2}>
            {menuList.map((item) => {
              return (
                <Grid size={3} key={item.menu_name}>
                  <CategoryCard
                    catergory={item.menu_name}
                    imoji={item.menu_imoji}
                    selected={selectedCategory === item.category}
                    onSelect={() => setSelectedCategory(item.category)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Divider
          sx={{
            width: "100%",
            borderColor: "#424242",
            borderBottomWidth: 3,
            mb: 3,
          }}
        />
        <Grid
          size={12}
          maxHeight={"50vh"}
          overflow={"auto"}
          sx={{
            // pt: 5,
            pb: 10,
            scrollbarWidth: "none",
          }}
        >
          <Grid container spacing={2}>
            {food_list
              .filter((item) => item.category === selectedCategory)
              .map((item) => {
                return (
                  <Grid size={3} key={item.menu_name}>
                    <ItemCard name={item.name} price={item.price} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      <Grid size={3} sx={{ background: "#262626", borderRadius: 4, mb: 8 }}>
        <CutomerDetail />
        <Divider
          sx={{
            width: "100%",
            borderColor: "#424242",
            borderBottomWidth: 3,
            mt: 1,
          }}
        />
        <CartItem></CartItem>
      </Grid>
    </Grid>
  );
}

export default Menu;
