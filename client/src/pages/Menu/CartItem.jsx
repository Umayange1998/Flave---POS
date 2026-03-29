import { Box, Grid, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
function CartItem() {
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
          <Typography>Club Sandwich</Typography>
          <Typography variant="caption">x2</Typography>
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
            <DeleteOutlineRoundedIcon />
            <ControlPointDuplicateRoundedIcon />
          </Box>
          <Box>$ 11.98</Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartItem;
