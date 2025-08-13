import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3 className="navbar-logo">Apni Dukaan</h3>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/logout">Logout</Link>

      </div>
    </nav>
  );
};

export default Navbar;
