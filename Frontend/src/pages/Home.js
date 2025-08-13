import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import clevertap from '../utils/clevertap.js';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', brand: '' });

  useEffect(() => {
    axios.get('http://localhost:3500/products').then(res => setProducts(res.data));
    //clevertap.event.push('Home Viewed');
        clevertap.event.push("Page Viewed", { page: "Home" });
  }, []);

  const filtered = products.filter(p =>
    (!filters.category || p.category === filters.category) &&
    (!filters.brand || p.brand === filters.brand)
  );

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="filters">
        <select onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          <option value="">All Categories</option>
          <option>Electronics</option><option>Apparel</option>
        </select>
        <select onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))}>
          <option value="">All Brands</option>
          <option>BrandA</option><option>BrandB</option>
        </select>
      </div>
      <div className="product-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
