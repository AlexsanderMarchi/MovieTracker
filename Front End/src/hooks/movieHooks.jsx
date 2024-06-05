import { useEffect, useState } from "react";

export const useFetchSearchedMovie = (nameSearched, setMovie) => {
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
  }, [nameSearched, setMovie]);
};

export const useFetchSelectedMovie = (
  imdbID,
  setSelectedMovie,
  title,
  setSuggestionsMovies,
  setNameSearched
) => {
  //SELECTED MOVIE
  useEffect(() => {
    const fetchMovieSelectedData = async () => {
      try {
        let api = `https://www.omdbapi.com/?i=${imdbID}&apikey=100f4720`; /// FIX THE IMDBID BUG OF BEING NULL
        let response = await fetch(api);
        const data = await response.json();
        setSelectedMovie(data);
        console.log("SELECTED MOVIE: ", data);
        window.scrollTo(0, 0);
        // console.log("DATA ABOUT MOVIE: ", imdbID, title);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    if (imdbID) {
      fetchMovieSelectedData();
      setSuggestionsMovies(title);
      setNameSearched("");
    }
  }, [imdbID, setSelectedMovie, title, setSuggestionsMovies, setNameSearched]);
};

export const useFetchSuggestions = (
  suggestedName,
  setSuggestionsMovies,
  setSuggestedNameTrue
) => {
  //SUGGESTED MOVIES
  useEffect(() => {
    const fetchSuggestions = async (
      suggestedName,
      setSuggestionsMovies,
      setSuggestedNameTrue
    ) => {
      try {
        let api;
        api = `https://www.omdbapi.com/?s=${suggestedName}&apikey=100f4720`;
        setSuggestedNameTrue(false);
        let response = await fetch(api);
        const data = await response.json();
        setSuggestionsMovies(data);
        // console.log("suggestion UseState: ", suggestedName);
        console.log("suggestions: ", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };
    if (suggestedName != "") {
      fetchSuggestions();
    }
  }, [suggestedName, setSuggestionsMovies, setSuggestedNameTrue]);
};
