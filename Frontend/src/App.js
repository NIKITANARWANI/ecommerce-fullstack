import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import { CartProvider } from "./context/CartContext";
import { UserProvider, UserContext } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";
import clevertap from "./utils/clevertap"; // make sure this path is correct
function AppRoutes() {
  const { isLoggedIn } = useContext(UserContext);
  // :point_down: CleverTap Web Push Setup
  useEffect(() => {
    setTimeout(() => {
      clevertap.notifications.push({
        titleText: "Would you like to receive Push Notifications?",
        bodyText: "We promise to only send you relevant content and updates",
        okButtonText: "Sign me up!",
        rejectButtonText: "No thanks",
        okButtonColor: "#F28046",
        askAgainTimeInSeconds: 5,
        serviceWorkerPath: "/clevertap_sw.js", // Ensure this is in /public folder
        vapidPublicKey: "BKmzNScoIEh8ytPM9z8BFTdcnb46b3s1xRDTQLu6lqHQfgH1DJVycnbuZAaZmFRB5cuvaeOiVcuYeA7nRwpGJgQ" // Replace with real key
        // skipDialog: true // Optional
      });
    }, 1000);
  }, []);
  return (
    <CartProvider>
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}