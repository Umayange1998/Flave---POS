import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        py: 1,
        backgroundColor: "#1d1d1d",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
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
          backgroundColor: "#1d1d1d",
          color: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <BottomNavigationAction
          sx={{
            color: "#ffffff",
            background: "#424242",
            borderRadius: 8,
            flexDirection: "row",
            gap: 1,
            my: 1,
            py: 3,
          }}
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          sx={{
            color: "#ffffff",
            background: "#424242",
            borderRadius: 8,
            flexDirection: "row",
            gap: 1,
            my: 1,
            py: 3,
          }}
          label="Orders"
          icon={<ViewListIcon />}
          onClick={() => navigate("/orders")}
        />

        <BottomNavigationAction
          sx={{
            color: "#ffffff",
            background: "#424242",
            borderRadius: 8,
            flexDirection: "row",
            gap: 1,
            my: 1,
            py: 3,
          }}
          label="Tables"
          icon={<TableRestaurantIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: "#ffffff",
            background: "#424242",
            borderRadius: 8,
            flexDirection: "row",
            gap: 1,
            my: 1,
            py: 3,
          }}
          label="More"
          icon={<PlaylistAddCircleIcon />}
        />
      </BottomNavigation>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          position: "absolute",
          top: -35,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          width: 70,
          height: 70,
          boxShadow: 3,
        }}
      >
        <LunchDiningIcon
          sx={{
            width: 40,
            height: 40,
          }}
        />
      </Button>
    </Box>
  );
}

export default Footer;
