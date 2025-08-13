// import React, { createContext, useState, useEffect } from 'react';
// import clevertap from '../utils/clevertap.js';

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     if (items.length) {
//       const timer = setTimeout(() => {
//         clevertap.event.push('Abandoned Cart Reminder', { items });
//       }, 15 * 60 * 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [items]);

//   const add = (product) => setItems(i => [...i, { ...product, qty: 1 }]);
//   const remove = id => setItems(i => i.filter(x => x.id !== id));

//   return (
//     <CartContext.Provider value={{ items, add, remove }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from "react";
import clevertap from "../utils/clevertap.js";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length) {
      const timer = setTimeout(() => {
        clevertap.event.push("Abandoned Cart Reminder", { items });
      }, 15 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [items]);

  // Add product, increase quantity if exists
  const add = (product) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        return prevItems.map((item, i) =>
          i === index ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // Remove one quantity, or remove item entirely if qty = 1
  const remove = (id) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[index].qty > 1) {
          updatedItems[index].qty -= 1;
        } else {
          updatedItems.splice(index, 1); // remove item completely
        }
        return updatedItems;
      }
      return prevItems;
      
    });
  };
 
  return (
    <CartContext.Provider value={{ items, add, remove }}>
      {children}
      
    </CartContext.Provider>
  );
}
