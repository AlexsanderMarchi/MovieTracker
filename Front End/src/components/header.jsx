import React, { useState, useEffect } from "react";
import "../styles/header.css";
import movieTrackerTitle from "../assets/movieTrackerTitle.png";

function Header() {
  return (
    <header id="header-main">
      <nav className="navbar">
        <img src={movieTrackerTitle}></img>
        <h1>Ola</h1>
        <h2>Login</h2>
      </nav>
      <div className="showcase"></div>
    </header>
  );
}

export default Header;
