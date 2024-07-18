import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./UI/Layout";
import AboutUs from "./pages/AboutUs";
import ShopifyDeveloper from "./pages/ShopifyDeveloper";
import ContactUs from "./pages/ContactUs";
import ScrollTop from "./componets/scrollTop/ScrollTop";
import Cart from "./pages/Cart";
import OurProducts from "./pages/OurProducts";
import ProtectedRoute from "./pages/Protected";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="schools/:id/products" element={<OurProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shopifydeveloper" element={<ShopifyDeveloper />} />
            <Route path="contactus" element={<ContactUs />} />
            {/* <Route path="mycart" element={<MyCart />} /> */}
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
