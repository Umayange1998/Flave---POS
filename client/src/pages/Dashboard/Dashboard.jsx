import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { useState } from "react";
import SummaryTab from "./SummaryTab";
import OrdersTab from "./OrdersTab";
import PaymentTab from "./PaymentTab";
import AddTableModal from "./AddTableModal";
const headButtons = [
  {
    label: "Add Table",
    icon: <TableRestaurantIcon />,
    action: "table",
    color: "primary",
  },
  {
    label: "Add Catogory",
    icon: <SetMealIcon />,
    action: "category",
    color: "secondary",
  },
  {
    label: "Add Disshes",
    icon: <RamenDiningIcon />,
    action: "dishes",
    color: "success",
  },
];

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [isaddTableModal, setIsTableModal] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleOpenModal = (action) => {
    if (action === "table") {
      setIsTableModal(true);
    }
  };
  return (
    <>
      <Grid container spacing={2} sx={{ pt: "80px", px: 5, pb: "80px" }}>
        <Grid
          size={6}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            px: "auto",
          }}
        >
          {headButtons.map(({ label, icon, action, color }) => {
            return (
              <Button
                variant="contained"
                color={color}
                sx={{
                  color: "#262626",
                  gap: 1,
                }}
                onClick={() => handleOpenModal(action)}
              >
                {label}
                {icon}
              </Button>
            );
          })}
        </Grid>

        <Grid size={12}>
          <Box>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="summary" />
              <Tab label="Orders" />
              <Tab label="Payment" />
            </Tabs>

            {/* Tab Panels */}
            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && <SummaryTab />}
              {tabValue === 1 && (
                <div>
                  <OrdersTab />
                </div>
              )}
              {tabValue === 2 && (
                <div>
                  <PaymentTab />
                </div>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <AddTableModal
        open={isaddTableModal}
        handleClose={() => setIsTableModal(false)}
      />
    </>
  );
}

export default Dashboard;
