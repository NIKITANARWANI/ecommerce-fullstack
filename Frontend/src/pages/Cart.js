import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, remove } = useContext(CartContext);
  const nav = useNavigate();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="container">
      <h2>Cart</h2>
      {items.map(i => (
        <div key={i.id} className="cart-item">
          {i.title} x{i.qty} - ₹{i.price * i.qty}
          <button onClick={() => remove(i.id)}>Remove</button>
        
        </div>
      ))}
       <div className="total">Total: ₹{total}</div>
      <button onClick={() => nav('/payment')}>Checkout</button>
    </div>
  );
}
