import "./App.css";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Orders from "./pages/Orders/Orders";
import Tables from "./pages/Tables/Tables";
import Menu from "./pages/Menu/Menu";
import AuthPAge from "./pages/Auth/AuthPAge";

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/auth" element={<AuthPAge />} />
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      {/* <SigninForm showSignin={showSignin} setShowSignin={setShowSignin} /> */}

      <div className="App">
        <Layout />
      </div>
    </>
  );
}

export default App;
