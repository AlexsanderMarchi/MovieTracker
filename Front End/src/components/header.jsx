import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle.jpg";

function Header() {
  const [nameSearched, setNameSearched] = useState({}); //actual variables for seach
  const [movie, setMovie] = useState({});
  const name = "run"; //test

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = `https://www.omdbapi.com/?t=${name}&apikey=100f4720`;

        let response = await fetch(api);
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    fetchData();
  }, [nameSearched]);

  return (
    <header id="header-main">
      <div className="navbar-container">
        <div className="container-content">
          <nav className="navbar flex-row-content">
            <img src={movieTrackerTitle}></img>
            <input
              type="text"
              placeholder="Pesquisar por nome"
              value={nameSearched}
              onChange={(e) => setNameSearched(e.target.value)}
              className="pesquisa"
            />
            <h2>Login</h2>
          </nav>
        </div>
      </div>
      <div className="showcase">
        <div className="container-content">
          <div className="movie-content">
            {movie && (
              <div className="detalhes-box">
                <img className="detalhes-img" src={movie.Poster} />
                <div className="description">
                  <h2 className="detalhes"> {movie.Title}</h2>
                  <p className="detalhes"> Plot: {movie.Plot}</p>
                  <p className="detalhes"> Genre: {movie.Genre}</p>
                  <p className="detalhes"> Director: {movie.Director}</p>
                  <p className="detalhes"> Actor: {movie.Actors}</p>
                  <p className="detalhes"> Writer: {movie.Writer}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
