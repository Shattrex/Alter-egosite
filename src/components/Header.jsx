import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-nav">
      <Link to="/" className="logo-link">
        <img
          src="/assets/alanto-logo.png"
          alt="Alanto AI"
          id="site-logo"
        />
      </Link>
      {/* …existing nav links… */}
    </header>
  );
} 