import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle.jpg";

function Header() {
  const [nameSearched, setNameSearched] = useState(""); //actual variables for seach
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [imdbID, setImdbID] = useState(null);
  const [movie, setMovie] = useState({});
  const name = "run"; //test;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = `https://www.omdbapi.com/?s=${nameSearched}&apikey=100f4720`;
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

  useEffect(() => {
    const fetchMovieSelectedData = async () => {
      try {
        let api = `https://www.omdbapi.com/?i=${imdbID}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setSelectedMovie(data);
        console.log("SELECTED MOVIE: ", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    if (imdbID) {
      fetchMovieSelectedData();
    }
  }, [imdbID]);

  const clickOnMovie = (imdbID) => {
    setImdbID(imdbID);
  };

  return (
    <header id="header-main">
      <div className="navbar-container">
        <div className="container-content">
          <nav className="navbar flex-row-content">
            <img src={movieTrackerTitle}></img>
            <div className="input-container">
              <input
                type="text"
                placeholder="Pesquisar por nome"
                value={nameSearched}
                onChange={(e) => setNameSearched(e.target.value)}
                className="pesquisa"
              />
              <div className="input-movies-container">
                <ul>
                  {Object.values(movie.Search || {}).map((film) => (
                    <li
                      //key={film.id}
                      onClick={() => clickOnMovie(film.imdbID)}
                      className="searched-movie-container"
                    >
                      <img src={film.Poster} />
                      <p className="searched-name">
                        {film.Title} ({film.Year})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h2>Login</h2>
          </nav>
        </div>
      </div>
      <div className="showcase">
        <div className="container-content">
          <div className="movie-content">
            {selectedMovie && (
              <div className="detalhes-box">
                <img className="detalhes-img" src={selectedMovie.Poster} />
                <div className="description">
                  {selectedMovie.Title && (
                    <h2 className="detalhes">
                      {" "}
                      {selectedMovie.Title} ({selectedMovie.Year})
                    </h2>
                  )}
                  <p className="detalhes"> {selectedMovie.Plot}</p>
                  {selectedMovie.Genre && (
                    <p className="detalhes">
                      <span>Genre:</span> {selectedMovie.Genre}
                    </p>
                  )}
                  {selectedMovie.Director && (
                    <p className="detalhes">
                      <span>Director:</span> {selectedMovie.Director}
                    </p>
                  )}
                  {selectedMovie.Actors && (
                    <p className="detalhes">
                      <span>Actor:</span> {selectedMovie.Actors}
                    </p>
                  )}
                  {selectedMovie.Writer && (
                    <p className="detalhes">
                      <span>Writer:</span> {selectedMovie.Writer}
                    </p>
                  )}
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
