import { useEffect, useState } from "react";

//SEARCHED MOVIE
export const useFetchSearchedMovie = (
  nameSearched,
  setNameSearched,
  movie,
  setMovie
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        let nameSearchedFixed = nameSearched.trim();
        let api = `https://www.omdbapi.com/?s=${nameSearchedFixed}&apikey=100f4720`;
        let response = await fetch(api);
        const data = await response.json();
        setMovie(data);
        console.log("SEARCHED MOVIE", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
      // console.log("Movie", movie.Response);
    };

    fetchData();
  }, [nameSearched]);
};

//SELECTED MOVIE
export const useFetchSelectedMovie = (
  imdbID,
  selectedMovie,
  setSelectedMovie,
  title,
  suggestionsMovies,
  setSuggestionsMovies,
  nameSearched,
  setNameSearched
) => {
  useEffect(() => {
    const fetchMovieSelectedData = async () => {
      try {
        let api = `https://www.omdbapi.com/?i=${imdbID}&apikey=100f4720`; /// FIX THE IMDBID BUG OF BEING NULL
        let response = await fetch(api);
        const data = await response.json();
        setSelectedMovie(data);
        console.log("SELECTED MOVIE: ", data);
        window.scrollTo(0, 0);
        setNameSearched("");
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    if (imdbID) {
      fetchMovieSelectedData();
      setSuggestionsMovies(title);
    }
  }, [imdbID]);
};

//SUGGESTED MOVIES
export const useFetchSuggestions = (
  suggestedName,
  setSuggestedName,
  suggestionsMovies,
  setSuggestionsMovies,
  suggestedNameTrue,
  setSuggestedNameTrue
) => {
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        let api;
        api = `https://www.omdbapi.com/?s=${suggestedName}&apikey=100f4720`;
        setSuggestedNameTrue(false);
        let response = await fetch(api);
        const data = await response.json();
        setSuggestionsMovies(data);
        console.log("SUGGESTED MOVIES: ", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };
    if (suggestedName != "") {
      fetchSuggestions();
    }
  }, [suggestedNameTrue, suggestedName]);
};

export const clickOnMovie = async (
  title,
  imdbID,
  setImdbID,
  suggestedName,
  setSuggestedName,
  setSuggestedNameTrue
) => {
  setImdbID(imdbID);
  const mainTitle = title.split(":")[0].trim();
  const words = mainTitle.split(/\s+/);
  // console.log(words);
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
