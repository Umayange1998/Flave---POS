import { Box, Button, Divider, Grid, Typography } from "@mui/material";
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
      <Grid
        size={3}
        sx={{ background: "#262626", borderRadius: 4, mb: 8, px: 2, py: 2 }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <CutomerDetail />
          </Grid>
          <Divider
            sx={{
              width: "100%",
              borderColor: "#424242",
              borderBottomWidth: 3,
              //   my: 1,
            }}
          />
          <Grid
            size={12}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            height={"35vh"}
          >
            <Typography textAlign={"start"}>Order detils</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflow: "auto",
                pb: 1,
              }}
            >
              <CartItem />
              <CartItem />
            </Box>
          </Grid>
          <Divider
            sx={{
              width: "100%",
              borderColor: "#424242",
              borderBottomWidth: 3,
              //   my: 1,
            }}
          />
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption">Items(4)</Typography>
              <Typography>$ 23.96</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption">Tax(18%)</Typography>
              <Typography variant="boddy2">$ 4.31</Typography>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Button variant="contained" color="#ffffff" fullWidth>
                    Cash
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="#ffffff" fullWidth>
                    Card
                  </Button>
                </Grid>
                <Grid size={6}>
                  {" "}
                  <Button variant="contained" fullWidth>
                    Print Receipt
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="secondary" fullWidth>
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Menu;
