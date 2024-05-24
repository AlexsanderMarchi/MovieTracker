import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle.jpg";

function Header() {
  const [nameSearched, setNameSearched] = useState(""); //Responsible to get the name you write on search bar and show movies with that name
  const [selectedMovie, setSelectedMovie] = useState(null); //This take the movie you clicked and bring the data about it
  const [suggestionsMovies, setSuggestionsMovies] = useState(null); //This show movies that are similar to selectedMovie
  const [suggestedName, setSuggestedName] = useState("");
  const [imdbID, setImdbID] = useState("");
  const [title, setTitle] = useState(null);
  const [movie, setMovie] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const name = "run"; //test;

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

  //SEARCHED MOVIE
  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = `https://www.omdbapi.com/?s=${nameSearched}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setMovie(data);
        // console.log("searched", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
      // console.log("Movie", movie.Response);
    };

    fetchData();
  }, [nameSearched]);

  //SELECTED MOVIE
  useEffect(() => {
    const fetchMovieSelectedData = async () => {
      try {
        let api = `https://www.omdbapi.com/?t=${title}&i=${imdbID}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setSelectedMovie(data);
        console.log("SELECTED MOVIE: ", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    if (title) {
      fetchMovieSelectedData();
      setSuggestionsMovies(title);
      setNameSearched("");
    }
  }, [title, imdbID]);

  //SUGGESTED MOVIES
  const clickOnMovie = async (title, imdbID) => {
    setTitle(title);
    setImdbID(imdbID);
    // const mainTitle = title.split(":")[0].trim();
    // setSuggestedName(title.split(":")[0].trim());
    setSuggestedName(title);
  };
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const mainTitle = title.split(":")[0].trim();
        setSuggestedName(mainTitle);
        let api = `https://www.omdbapi.com/?s=${suggestedName}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setSuggestionsMovies(data);
        console.log("suggestion", "suggestion UseState: ", suggestedName, data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };
    if (suggestedName != "") {
      fetchSuggestions();
    }
  }, [suggestedName]);

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
                            //key={film.id}
                            onClick={() =>
                              clickOnMovie(film.Title, film.imdbID)
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
                  <div className="descriptionContent">
                    {selectedMovie.Genre && (
                      <p className="detalhes">
                        <span>Genre:</span> {selectedMovie.Genre}{" "}
                        {selectedMovie.Type}
                      </p>
                    )}
                    {selectedMovie.Director && (
                      <p className="detalhes">
                        <span>Director:</span> {selectedMovie.Director}
                      </p>
                    )}
                    {selectedMovie.Actors && (
                      <p className="detalhes">
                        <span>Actor:</span> {selectedMovie.Actors};
                      </p>
                    )}
                    {selectedMovie.Writer && (
                      <p className="detalhes">
                        <span>Writer:</span> {selectedMovie.Writer}
                      </p>
                    )}
                    {selectedMovie.BoxOffice && (
                      <p className="detalhes">
                        <span>Box Office:</span> {selectedMovie.BoxOffice}
                      </p>
                    )}
                    {selectedMovie.Awards && (
                      <p className="detalhes">
                        <span>Awards:</span> {selectedMovie.Awards}
                      </p>
                    )}
                  </div>
                  <div className="ratings-container">
                    <h2>Ratings</h2>
                    <p className="detalhes">
                      <span>IMDB:</span> {selectedMovie.imdbRating}
                    </p>
                    <p className="detalhes">
                      <span>Metascore:</span> {selectedMovie.Metascore}
                    </p>
                    {Object.values(selectedMovie.Ratings || {}).map(
                      (filmRatings) => (
                        <li
                          //key={film.id}
                          className=""
                        >
                          <p className="detalhes">
                            <span>{filmRatings.Source}:</span>&nbsp;
                            {filmRatings.Value}
                          </p>
                        </li>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="suggestions-container">
            {suggestionsMovies && (
              <div className="suggestions-list-container">
                <ul>
                  {Object.values(suggestionsMovies.Search || {})
                    .filter((filmSugestion) => filmSugestion.Poster !== "N/A")
                    .map((filmSugestion) => (
                      <li
                        //key={film.id}
                        onClick={() =>
                          clickOnMovie(
                            filmSugestion.Title,
                            filmSugestion.imdbID
                          )
                        }
                        className="suggestion-movie-container"
                      >
                        <div className="poster-content">
                          <img src={filmSugestion.Poster} />
                          <p className="suggestion-name">
                            {filmSugestion.Title}({filmSugestion.Year})
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
