import React, { useContext } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import SearchedMovie from "../components/searchedMovie";
import { MovieContext } from "../contexts/movieContext";
import {
  useFetchSearchedMovie,
  useFetchSelectedMovie,
  useFetchSuggestions,
  clickOnMovie,
} from "../hooks/movieHooks";

function Search() {
  const {
    nameSearched,
    setNameSearched,
    selectedMovie,
    setSelectedMovie,
    suggestionsMovies,
    setSuggestionsMovies,
    movie,
    setMovie,
    suggestedName,
    setSuggestedName,
    suggestedNameTrue,
    setSuggestedNameTrue,
    imdbID,
    setImdbID,
    title,
    setTitle,
  } = useContext(MovieContext);

  useFetchSearchedMovie(nameSearched, setNameSearched, movie, setMovie);
  useFetchSelectedMovie(
    imdbID,
    selectedMovie,
    setSelectedMovie,
    title,
    suggestionsMovies,
    setSuggestionsMovies,
    nameSearched,
    setNameSearched
  );
  useFetchSuggestions(
    suggestedName,
    setSuggestedName,
    suggestionsMovies,
    setSuggestionsMovies,
    suggestedNameTrue,
    setSuggestedNameTrue
  );

  const handleClickOnMovie = async (title, imdbID, year) => {
    clickOnMovie(
      title,
      imdbID,
      setImdbID,
      suggestedName,
      setSuggestedName,
      setSuggestedNameTrue
    );
  };
  return (
    <>
      <div className="main-container">
        <Header
          nameSearched={nameSearched}
          setNameSearched={setNameSearched}
          movie={movie}
          handleClickOnMovie={handleClickOnMovie}
        />
        <SearchedMovie
          selectedMovie={selectedMovie}
          suggestionsMovies={suggestionsMovies}
          handleClickOnMovie={handleClickOnMovie}
        />
        <Footer />
      </div>
    </>
  );
}

export default Search;
