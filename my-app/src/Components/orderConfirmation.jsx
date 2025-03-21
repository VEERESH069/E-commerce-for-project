import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addressId, email } = location.state || {};
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!addressId || !email) {
      navigate("/select-address");
      return;
    }
    const fetchData = async () => {
      try {
        const addressResponse = await axios.get("http://localhost:3000/user/get-address");
        const address = addressResponse.data.addresses.find((addr) => addr._id === addressId);
        if (!address) throw new Error("Selected address not found.");
        setSelectedAddress(address);

        const cartResponse = await axios.get("http://localhost:3000/product/getcart", { params: { email } });
        const processedCartItems = cartResponse.data.cart.map((item) => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          images: item.productId.images.map((imagePath) => `http://localhost:3000${imagePath}`),
          quantity: item.quantity,
        }));
        setCartItems(processedCartItems);
        setTotalPrice(processedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [addressId, email, navigate]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/order/place", { email, addressId });
      navigate("/order-success", { state: { order: response.data.order } });
    } catch (err) {
      setError(err.message || "An unexpected error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="w-full h-screen flex justify-center items-center">Processing...</div>;
  if (error) return <div className="w-full h-screen flex justify-center items-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Order Confirmation</h2>
      <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-md">
        <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
        {selectedAddress ? (
          <p className="p-4 border rounded-md">{selectedAddress.address1}, {selectedAddress.city}, {selectedAddress.state}</p>
        ) : (
          <p>No address selected.</p>
        )}
        <h3 className="text-xl font-medium mt-6 mb-2">Cart Items</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border p-4 rounded-md mb-2">
              <p>{item.name} (x{item.quantity})</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="text-right text-xl font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</div>

        <h3 className="text-xl font-medium mt-6 mb-2">Payment Method</h3>
        <PayPalScriptProvider options={{ "client-id": "AdX2O57T7vp3UQNhVRvjjRHsHD-x-zXZ1RXnm9sEqRywtkWnDHeK1v6FYV4idtlBWKqZuA8xIdjJF-uA" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({ purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }] });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(() => alert("Payment Successful!"));
            }}
          />
        </PayPalScriptProvider>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 w-full text-center"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;