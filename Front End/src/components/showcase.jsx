import React, { useState, useEffect } from "react";
import "../styles/showcase.css";
import "../styles/utilities.css";

function Showcase() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const words = ["FIND", "DISCOVER", "ORGANIZE"];
    const wait = 3000;

    const type = () => {
      const currentWord = wordIndex % words.length;
      const fullTxt = words[currentWord];

      if (isDeleting) {
        setText((prevText) => prevText.slice(0, -1));
      } else {
        setText((prevText) => fullTxt.slice(0, prevText.length + 1));
      }

      if (!isDeleting && text === fullTxt) {
        setTimeout(() => setIsDeleting(true), wait);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prevIndex) => prevIndex + 1);
      }
    };

    const timeout = setTimeout(type, isDeleting ? 150 : 300);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);
  return (
    <div id="showcase-main">
      <div className="container-content">
        <div className="showcase-content-container">
          <h2>
            <span className="txt">{text}</span> MOVIES & SERIES
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
