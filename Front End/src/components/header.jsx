import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../contexts/movieContext";
import "../styles/utilities.css";
import "../styles/header.css";
import movieTrackerTitle from "../../public/logo.png";

function Header({ nameSearched, setNameSearched, movie, handleClickOnMovie }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleSearch = (film) => {
    handleClickOnMovie(film.Title, film.imdbID, film.Year);
    navigate("/search");
  };

  useEffect(() => {
    const pageScrooled = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", pageScrooled);
    return () => {
      window.removeEventListener("scroll", pageScrooled);
    };
  }, []);

  return (
    <header id="header-main">
      <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <div className="container-content">
          <nav className="navbar flex-row-content">
            <div className="flex-row-content">
              <img onClick={() => navigate("/")} src={movieTrackerTitle}></img>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Digite um nome para pesquisa"
                  value={nameSearched}
                  onChange={(e) => setNameSearched(e.target.value)}
                  className="pesquisa"
                />
                {movie.Response != "False" && (
                  <div className="input-movies-container">
                    <ul>
                      {Object.values(movie.Search || {})
                        .filter((film) => film.Poster !== "N/A")
                        .map((film) => (
                          <li
                            key={film.imdbID}
                            onClick={() => handleSearch(film)}
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
                )}
              </div>
            </div>
            <h2>Login</h2>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
