import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import { useDispatch } from "react-redux";
import {
  addItem,
  increaseItem,
  removeItem,
} from "../../Redux/Slices/cartSlice";

function CartItem({ id, name, price, quantity }) {
  const dispatch = useDispatch();
  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={"#424242"}
      borderRadius={2}
      px={2}
      py={1}
      minHeight={"10vh"}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>{name}</Typography>
          <Typography variant="caption">x {quantity} </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              sx={{ color: "#ffffff" }}
              onClick={() => dispatch(removeItem(id))}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#ffffff" }}
              onClick={() => dispatch(increaseItem(id))}
            >
              <ControlPointDuplicateRoundedIcon />
            </IconButton>
          </Box>
          <Box>$ {price} </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartItem;
