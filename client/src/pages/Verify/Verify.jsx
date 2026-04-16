import React from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Verify() {
  const [searchParams, setSerchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const success = searchParams.get("success");
  useEffect(() => {
    const handleCancel = async () => {
      try {
        await axios.delete(`${baseURL}/payment/cancel/${orderId}`);
        toast.error("Payment cancelled");
        navigate("/menu");
      } catch (err) {
        toast.error("Cancel handling failed");
        navigate("/menu");
      }
    };

    const verify = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/payment/verify-session/${sessionId}`,
        );

        if (res.data.status === "paid") {
          toast.success("Payment successful");
          navigate("/orders");
        } else {
          toast.error("Payment not completed");
          navigate("/menu");
        }
      } catch (err) {
        toast.error("Verification failed");
        navigate("/menu");
      }
    };

    if (success === "false") {
      handleCancel();
    } else if (sessionId) {
      verify();
    }
  }, [sessionId, success, orderId]);
  return (
    <div className="fullscreen-loader">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
