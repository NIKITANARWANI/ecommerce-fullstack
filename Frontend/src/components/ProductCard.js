import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import clevertap from '../utils/clevertap.js';

export default function ProductCard({ product }) {
  const { add } = useContext(CartContext);
  const addToCart = () => {
    add(product);
    alert('Product added to cart');
    clevertap.event.push('Add to Cart', { productId: product.id, title: product.title, price: product.price });
 
  };

  return (
    <div className="product-card">
      <img src={product.image} width={150} />
      <h4>{product.title}</h4>
      <p>₹{product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
