import "../styles/searchedMovie.css";

function SearchedMovie({
  selectedMovie,
  suggestionsMovies,
  handleClickOnMovie,
}) {
  const handleSearch = (filmSugestion) => {
    handleClickOnMovie(
      filmSugestion.Title,
      filmSugestion.imdbID,
      filmSugestion.Year
    );
  };

  return (
    <header id="header-main">
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
                  {selectedMovie.imdbRating && (
                    <div className="ratings-container">
                      <h2>Ratings</h2>
                      {selectedMovie.imdbRating && (
                        <p className="detalhes">
                          <span>IMDB:</span> {selectedMovie.imdbRating}
                        </p>
                      )}
                      {selectedMovie.imdbRating && (
                        <p className="detalhes">
                          <span>Metascore:</span> {selectedMovie.Metascore}
                        </p>
                      )}
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
                  )}
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
                    .filter((filmSugestion) => {
                      // Verifique se selectedMovie e selectedMovie.imdbID existem
                      if (!selectedMovie || !selectedMovie.imdbID) {
                        return true; // Se selectedMovie ou selectedMovie.imdbID for nulo, não filtrar
                      }
                      return filmSugestion.imdbID !== selectedMovie.imdbID;
                    })
                    .map((filmSugestion) => (
                      <li
                        key={filmSugestion.imdbID}
                        onClick={() => handleSearch(filmSugestion)}
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

export default SearchedMovie;
