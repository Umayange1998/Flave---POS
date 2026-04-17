import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { menuList } from "../../Assets/menu.js";
import CategoryCard from "./CategoryCard";
import { food_list } from "../../Assets/menu.js";
import ItemCard from "./ItemCard.jsx";
import CutomerDetail from "./CutomerDetail.jsx";
import CartItem from "./CartItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getTotalPrice,
  removeAllItem,
} from "../../Redux/Slices/cartSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addOrder, createPayment, updateTable } from "../../https/index.js";
import { removeCustomer } from "../../Redux/Slices/cutomerSlice.js";
import { QRCodeCanvas } from "qrcode.react";
import { useQuery } from "@tanstack/react-query";
import api from "../../https";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Mains");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrUrl, setQrUrl] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = useSelector(getTotalPrice);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;

  function handleAddToCart(item, quantity) {
    if (quantity === 0) {
      return;
    } else {
      const { name, price } = item;
      const newObj = {
        id: new Date(),
        name,
        pricePerQnt: price,
        quantity: quantity,
      };
      dispatch(addItem(newObj));
    }
  }

  const token = localStorage.getItem("token");

  const handlePlaceOrder = async () => {
    try {
      console.log("Customer Data:", customerData);
      if (!paymentMethod) {
        toast.error("Select payment method");
        return;
      }

      //  CREATE ORDER FIRST
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "preparing",
        bills: {
          total: total,
        },
        items: cartData,
        table: customerData.table.tableId,
      };

      setTimeout(() => {
        orderMutation.mutate(orderData);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      console.log(data);
      setCurrentOrderId(data._id);
      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };
      if (paymentMethod === "online") {
        localStorage.setItem("tableId", data.table);
        paymentMutation.mutate({
          orderId: data._id,
          amount: total,
          customerEmail: customerData.email,
        });
        return;
      }

      // CASH FLOW
      toast.success("Order Placed (Cash)");
      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
        console.log("tableData", tableData);
      }, 1500);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (paymentData) => createPayment(paymentData),
    onSuccess: (resData) => {
      console.log("Payment session:", resData);
      const sessionUrl = resData.data.sessionUrl;

      if (sessionUrl) {
        // window.location.href = sessionUrl;
        setQrUrl(sessionUrl);
      } else {
        toast.error("Payment failed");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Payment failed");
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log("resData", resData);
      dispatch(removeCustomer());
      dispatch(removeAllItem());
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: paymentStatus } = useQuery({
    queryKey: ["paymentStatus", currentOrderId],
    queryFn: async () => {
      const res = await api.get(`/payment/status/${currentOrderId}`);
      return res.data.status;
    },
    enabled: !!currentOrderId, // only run when order exists
    refetchInterval: (data) => (data === "paid" ? false : 3000),
  });
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
                <Typography>
                  {customerData.customerName || "Customer Name"}
                </Typography>
                <Typography variant="caption">
                  Table No : {customerData.table?.tableNo || "N/A"}
                </Typography>
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
                    <ItemCard
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      onClick={(count) => handleAddToCart(item, count)}
                    />
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
              {cartData.length === 0 ? (
                <Typography variant="caption">Cart is Empty</Typography>
              ) : (
                cartData.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.pricePerQnt * item.quantity}
                      quantity={item.quantity}
                    />
                  );
                })
              )}
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="caption">
                Items({cartData.length})
              </Typography>
              <Typography>$ {total}</Typography>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption">Tax(18%)</Typography>
              <Typography variant="boddy2">$ 4.31</Typography>
            </Box> */}
            <Box>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        paymentMethod === "cash" ? "#54D62C" : "#1f1f1f",
                      color: "#ffffff",
                    }}
                    fullWidth
                    onClick={() => setPaymentMethod("cash")}
                  >
                    Cash
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        paymentMethod === "online" ? "#54D62C" : "#1f1f1f",
                      color: "#ffffff",
                    }}
                    fullWidth
                    onClick={() => setPaymentMethod("online")}
                  >
                    Online
                  </Button>
                </Grid>
                <Grid size={6}>
                  {" "}
                  <Button variant="contained" fullWidth>
                    Print Receipt
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button
                    onClick={() => handlePlaceOrder()}
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {qrUrl && (
          // <Grid container spacing={2}>
          //   {" "}
          //   <Grid size={12} sx={{}}></Grid>
          <Box
            sx={{
              mt: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              alignContent: "space-between",
            }}
          >
            <Typography variant="body2">Scan to Pay</Typography>
            <Box
              sx={{
                // mt: 2,
                textAlign: "center",
                display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                // alignContent: "space-between",
              }}
            >
              <QRCodeCanvas value={qrUrl} size={180} />
            </Box>

            <Typography variant="caption">Waiting for payment...</Typography>
          </Box>
          // </Grid>
        )}
        {currentOrderId && (
          <Box textAlign="center">
            <Typography variant="caption">Payment Status:</Typography>

            <Typography
              color={paymentStatus === "paid" ? "success.main" : "warning.main"}
            >
              {paymentStatus || "pending"}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Menu;
