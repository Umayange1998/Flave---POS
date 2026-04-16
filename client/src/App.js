import "./App.css";
import axios from "axios";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Orders from "./pages/Orders/Orders";
import Tables from "./pages/Tables/Tables";
import Menu from "./pages/Menu/Menu";
import AuthPAge from "./pages/Auth/AuthPAge";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Veryfy from "./pages/Verify/Verify";

function Layout() {
  const location = useLocation();
  const isloading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector((state) => state.user);
  if (isloading) {
    return <FullScreenLoader />;
  }
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/" /> : <AuthPAge />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/verify-payment"
          element={
            <ProtectedRoutes>
              <Veryfy />
            </ProtectedRoutes>
          }
        />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return children;
}
function App() {
  return (
    <>
      {/* <SigninForm showSignin={showSignin} setShowSignin={setShowSignin} /> */}

      <div className="App">
        <ToastContainer />

        <Layout />
      </div>
    </>
  );
}

export default App;
