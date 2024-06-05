import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [nameSearched, setNameSearched] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [suggestionsMovies, setSuggestionsMovies] = useState(null);
  const [movie, setMovie] = useState({});

  return (
    <MovieContext.Provider
      value={{
        nameSearched,
        setNameSearched,
        selectedMovie,
        setSelectedMovie,
        suggestionsMovies,
        setSuggestionsMovies,
        movie,
        setMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
