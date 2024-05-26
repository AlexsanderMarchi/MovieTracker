import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utilities.css";
import movieTrackerTitle from "../assets/movieTrackerTitle3.jpg";

function Header() {
  const [nameSearched, setNameSearched] = useState(""); //Responsible to get the name you write on search bar and show movies with that name
  const [selectedMovie, setSelectedMovie] = useState(null); //This take the movie you clicked and bring the data about it
  const [suggestionsMovies, setSuggestionsMovies] = useState(null); //This show movies that are similar to selectedMovie
  const [suggestedName, setSuggestedName] = useState("");
  const [suggestedNameTrue, setSuggestedNameTrue] = useState(false);
  const [imdbID, setImdbID] = useState(null);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);
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
        let nameSearchedFixed = nameSearched.trim();
        let api = `https://www.omdbapi.com/?s=${nameSearchedFixed}&apikey=100f4720`;
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
        let api = `https://www.omdbapi.com/?i=${imdbID}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setSelectedMovie(data);
        // console.log("SELECTED MOVIE: ", data);
        window.scrollTo(0, 0);
        // console.log("DATA ABOUT MOVIE: ", imdbID);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    if (imdbID) {
      fetchMovieSelectedData();
      setSuggestionsMovies(title);
      setNameSearched("");
    }
  }, [imdbID, title]);

  const clickOnMovie = async (title, imdbID, year) => {
    setImdbID(imdbID);
    const mainTitle = title.split(":")[0].trim();
    console.log(mainTitle);
    const words = mainTitle.split(/\s+/);
    console.log(words);
    let finalTitle;
    if (words.length > 1) {
      if (words[0].length > 3) {
        finalTitle = words.slice(0, 2).join(" "); // Pega as duas primeiras palavras se a primeira tiver mais de 3 letras
      } else {
        finalTitle = words[1]; // Pega apenas a segunda palavra se a primeira tiver 3 letras ou menos
      }
    } else {
      finalTitle = mainTitle; // Se não houver mais de uma palavra, usa o título original
    }
    setSuggestedName(finalTitle);
    if (suggestedName === finalTitle) {
      setSuggestedNameTrue(true);
    }
  };
  //SUGGESTED MOVIES
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        let api;
        api = `https://www.omdbapi.com/?s=${suggestedName}&apikey=100f4720`;
        setSuggestedNameTrue(false);
        let response = await fetch(api);
        const data = await response.json();
        setSuggestionsMovies(data);
        console.log("suggestion UseState: ", suggestedName);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };
    if (suggestedName != "") {
      fetchSuggestions();
    }
  }, [suggestedNameTrue, suggestedName]);

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
                    {selectedMovie.totalSeasons && (
                      <p className="detalhes">
                        <span>Seasons:</span> {selectedMovie.totalSeasons}
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
                    .filter(
                      (filmSugestion) =>
                        filmSugestion.imdbID !== selectedMovie.imdbID
                    )
                    .map((filmSugestion) => (
                      <li
                        //key={film.id}
                        onClick={() =>
                          clickOnMovie(
                            filmSugestion.Title,
                            filmSugestion.imdbID,
                            filmSugestion.Year
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
