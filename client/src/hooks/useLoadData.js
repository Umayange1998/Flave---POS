import axios from "axios";
import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL;

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();
        console.log(data);
        const { _id, name, phone, email, role } = data.data;
        dispatch(setUser({ _id, name, phone, email, role }));
      } catch (error) {
        dispatch(removeUser());
        navigate("/auth");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);
  return isloading;
};
export default useLoadData;
