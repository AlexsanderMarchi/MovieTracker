import React, { useState, useEffect } from "react";
import "../styles/home.css";
import Header from "../components/header";
import Showcase from "../components/showcase";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Header />
      <Showcase />
      <Footer />
    </>
  );
}

export default Home;
