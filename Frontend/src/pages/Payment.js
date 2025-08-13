import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import clevertap from '../utils/clevertap.js';


export default function Payment() {
  const { items } = useContext(CartContext);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const nav = useNavigate();

  const handlePay = () => {
    clevertap.event.push('Charged', {
      Amount: total,
      "Payment Mode": "Credit Card",
      Items: items.map(i => ({
        "Product Name": i.title,
        Category: i.category,
        Quantity: i.qty,
      }))
    });
    alert('Payment successful!');
    nav('/home');
  };

  return (
    <div  className="container">
      <h2>Payment</h2>
      <div className="total">Total payable: ₹{total}</div>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
