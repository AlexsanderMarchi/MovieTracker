import React, { useState, useEffect } from "react";
import "../styles/footer.css";
import "../styles/utilities.css";
import {
  AiFillInstagram,
  AiFillGithub,
  AiTwotoneMail,
  AiFillLinkedin,
} from "react-icons/ai";

function Footer() {
  return (
    <footer id="footer-main">
      <div className="container-content">
        <div className="footer-content flex-row-content">
          <h1>Hello there</h1>
          <div className="social">
            <h3>About Us: </h3>
            <a href="mailto:alexsandermarchi@gmail.com" target="_blank">
              <AiTwotoneMail className="contact" />
            </a>
            <a href="https://github.com/AlexsanderMarchi" target="_blank">
              <AiFillGithub className="contact" />
            </a>
            <a href="https://instagram.com/alex_marchz" target="_blank">
              <AiFillInstagram className="contact " />
            </a>
            <a
              href="https://www.linkedin.com/in/alexsander-marchi-zunino-226332170/"
              target="_blank"
            >
              <AiFillLinkedin className="contact" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
