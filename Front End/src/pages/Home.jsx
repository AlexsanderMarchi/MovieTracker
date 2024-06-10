import React, { useContext } from "react";
import Header from "../components/header";
import Showcase from "../components/showcase";
import Footer from "../components/footer";
import SugDirectors from "../components/SugDirectors";
import { MovieContext } from "../contexts/movieContext";
import {
  useFetchSearchedMovie,
  useFetchSelectedMovie,
  useFetchSuggestions,
  clickOnMovie,
} from "../hooks/movieHooks";

function Home() {
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
      <Header
        nameSearched={nameSearched}
        setNameSearched={setNameSearched}
        movie={movie}
        handleClickOnMovie={handleClickOnMovie}
      />
      <Showcase />
      <SugDirectors />
      <Footer />
    </>
  );
}

export default Home;
