import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import AdminPanel from "./pages/admin/AdminPanel.jsx";
import Home from "./pages/website/Home.jsx";
import Products from "./pages/website/Products.jsx";
import CartPage from "./pages/website/CartPage.jsx";
import CheckoutPage from "./pages/website/Checkout.jsx";
import AuthPage from "./pages/website/AuthPage.jsx";
import TestComponent from "./components/TestComponent.jsx";
import Profile from "./components/website/Profile.jsx";
import WebsiteLayout from "./pages/WebsiteLayout.jsx";

function AppRoutes() {
  return (
    <div className="min-h-screen bg-[#e3e6e6]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/website/:id" element={<WebsiteLayout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<TestComponent />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoutes;
