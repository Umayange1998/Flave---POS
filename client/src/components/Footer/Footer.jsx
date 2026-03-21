import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

function Footer() {
  const [value, setValue] = React.useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#313131",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: "#313131",
          color: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <BottomNavigationAction
          sx={{ color: "#ffffff" }}
          label="Recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "#ffffff" }}
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{
            position: "inherit",
            borderRadius: "50%",
            mb: 2,
          }}
        >
          <FastfoodIcon />
        </Button>
        <BottomNavigationAction
          sx={{ color: "#ffffff" }}
          label="Nearby"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}

export default Footer;
