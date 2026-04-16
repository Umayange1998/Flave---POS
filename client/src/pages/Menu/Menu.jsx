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
import { addItem, getTotalPrice } from "../../Redux/Slices/cartSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Mains");
  const [paymentMethod, setPaymentMethod] = useState("");
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

  const useCreateOrder = (baseURL, token) => {
    return useMutation({
      mutationFn: async (orderData) => {
        const res = await axios.post(`${baseURL}/orders/addorder`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.data; // return order
      },
    });
  };
  const useCreatePayment = (baseURL) => {
    return useMutation({
      mutationFn: async (paymentData) => {
        const res = await axios.post(`${baseURL}/payment/place`, paymentData);
        return res.data;
      },
    });
  };
  const token = localStorage.getItem("token");

  const createOrderMutation = useCreateOrder(baseURL, token);
  const createPaymentMutation = useCreatePayment(baseURL);

  const handlePlaceOrder = async () => {
    try {
      console.log("Customer Data:", customerData);
      if (!paymentMethod) {
        toast.error("Select payment method");
        return;
      }

      // 🧾 1. CREATE ORDER FIRST
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "pending",
        bills: {
          total: total,
        },
        items: cartData,
        table: customerData.tableId,
      };

      const order = await createOrderMutation.mutateAsync(orderData);

      const orderId = order._id;

      // 💵 2. CASH FLOW
      if (paymentMethod === "cash") {
        toast.success("Order placed (Cash)");
        navigate("/orders");
        console.log("Order ID:", orderId);
        return;
      }

      // 💳 3. ONLINE (Stripe)
      const paymentRes = await createPaymentMutation.mutateAsync({
        orderId,
        amount: total,
        customerEmail: customerData.email,
      });

      if (paymentRes.sessionUrl) {
        window.location.href = paymentRes.sessionUrl;
      }
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };
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
                  Table No : {customerData.tableNo}
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
      </Grid>
    </Grid>
  );
}

export default Menu;
