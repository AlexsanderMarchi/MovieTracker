import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../contexts/movieContext";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle3.jpg";

function Header() {
  const { nameSearched, setNameSearched, movie } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setNameSearched(e.target.value);
    navigate("/search");
  };

  const [scrolled, setScrolled] = useState(false);

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
              <img src={movieTrackerTitle}></img>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Digite um nome para pesquisa"
                  value={nameSearched}
                  onChange={handleSearch}
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
                            onClick={() =>
                              clickOnMovie(film.Title, film.imdbID, film.Year)
                            }
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
