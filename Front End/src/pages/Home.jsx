import React, { useState, useEffect, useContext } from "react";
import "../styles/home.css";
import Header from "../components/header";
import Showcase from "../components/showcase";
import Footer from "../components/footer";
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

  // //SEARCHED MOVIE
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let nameSearchedFixed = nameSearched.trim();
  //       let api = `https://www.omdbapi.com/?s=${nameSearchedFixed}&apikey=100f4720`;
  //       let response = await fetch(api);
  //       const data = await response.json();
  //       setMovie(data);
  //       // console.log("searched", data);
  //     } catch (error) {
  //       console.error("Deu ruim: ", error);
  //     }
  //     // console.log("Movie", movie.Response);
  //   };

  //   fetchData();
  // }, [nameSearched]);

  // //SELECTED MOVIE
  // useEffect(() => {
  //   const fetchMovieSelectedData = async () => {
  //     try {
  //       let api = `https://www.omdbapi.com/?i=${imdbID}&apikey=100f4720`; /// FIX THE IMDBID BUG OF BEING NULL
  //       let response = await fetch(api);
  //       const data = await response.json();
  //       setSelectedMovie(data);
  //       console.log("SELECTED MOVIE: ", data);
  //       window.scrollTo(0, 0);
  //       // console.log("DATA ABOUT MOVIE: ", imdbID, title);
  //     } catch (error) {
  //       console.error("Deu ruim: ", error);
  //     }
  //   };

  //   if (imdbID) {
  //     fetchMovieSelectedData();
  //     setSuggestionsMovies(title);
  //     setNameSearched("");
  //   }
  // }, [imdbID]);

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
  // const mainTitle = title.split(":")[0].trim();
  // console.log(mainTitle);
  // const words = mainTitle.split(/\s+/);
  // console.log(words);
  // let finalTitle;
  // if (words.length > 1) {
  //   if (words[0].length > 3) {
  //     finalTitle = words.slice(0, 2).join(" "); // Pega as duas primeiras palavras se a primeira tiver mais de 3 letras
  //   } else {
  //     finalTitle = words[1]; // Pega apenas a segunda palavra se a primeira tiver 3 letras ou menos
  //   }
  // } else {
  //   finalTitle = mainTitle; // Se não houver mais de uma palavra, usa o título original
  // }
  // setSuggestedName(finalTitle);
  // if (suggestedName === finalTitle) {
  //   setSuggestedNameTrue(true);
  // }
  // };

  return (
    <>
      <Header
        nameSearched={nameSearched}
        setNameSearched={setNameSearched}
        movie={movie}
        handleClickOnMovie={handleClickOnMovie}
      />
      <Showcase />
      <Footer />
    </>
  );
}

export default Home;
