import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle.jpg";

function Header() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = `https://www.omdbapi.com/?t=run&apikey=100f4720`;

        let response = await fetch(api);
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <header id="header-main">
      <div className="navbar-container">
        <div className="container-content">
          <nav className="navbar flex-row-content">
            <img src={movieTrackerTitle}></img>
            <h1>Ola</h1>
            <h2>Login</h2>
          </nav>
        </div>
      </div>
      <div className="showcase">
        <div className="container-content">
          <div className="movie-content">
            {movie && (
              <div className="detalhes-box">
                <h2 className="detalhes"> Nome: {movie.Title}</h2>
                <h2 className="detalhes"> Nome: {movie.Title}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
