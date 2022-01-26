import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/products/Navbar/Navbar";
import { commerce } from "./lib/Commerce";
import Categories from "./components/products/Categories";
import Cart from "./components/products/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ".//styles.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list({
      limit: 200,
    });

    setProducts(data);
    console.log(data);
  };

  const fetchCart = async () => {
    const res = await commerce.cart.retrieve();

    setCart(res);
  };

  const addToCart = async (productID, quantity) => {
    const res = await commerce.cart.add(productID, quantity);

    setCart(res.cart);
  };

  const updateCart = async (productID, quantity) => {
    const res = await commerce.cart.update(productID, { quantity });

    setCart(res.cart);
  };

  const removeFromCart = async (productID) => {
    const res = await commerce.cart.remove(productID);

    setCart(res.cart);
  };

  const emptyCart = async () => {
    const res = await commerce.cart.empty();
    setCart(res.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);
  return (
    <Router>
      <>
        <Nav totalCart={cart.total_items} cartItems={cart.line_items} />

        <Routes>
          <Route
            path="/"
            element={<Categories products={products} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
                emptyCart={emptyCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout cart={cart} onCaptureCheckout={handleCaptureCheckout} />
            }
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;
