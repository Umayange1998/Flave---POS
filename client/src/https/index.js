import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
export const getUserData = () => api.get("/user/getUser");

// Order Endpoint
export const addOrder = (data) => api.post("/orders/addorder", data);
export const getAllOrders = () => api.get("/orders/getall");
export const updateOrder = ({ orderId, ...orderData }) =>
  api.put(`/orders/update/${orderId}`, orderData);

// Table Endpoint
export const updateTable = ({ tableId, ...tableData }) =>
  api.put(`/tables/update/${tableId}`, tableData);
export const getTables = () => api.get("/tables/getall");

// Payment Endpoint
export const createPayment = (data) => api.post("/payment/place", data);
