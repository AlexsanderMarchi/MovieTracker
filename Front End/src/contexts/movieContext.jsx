import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [nameSearched, setNameSearched] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [suggestionsMovies, setSuggestionsMovies] = useState(null);
  const [movie, setMovie] = useState({});
  const [suggestedName, setSuggestedName] = useState("");
  const [suggestedNameTrue, setSuggestedNameTrue] = useState(false);
  const [imdbID, setImdbID] = useState("007");
  const [title, setTitle] = useState(null);

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
        suggestedName,
        setSuggestedName,
        suggestedNameTrue,
        setSuggestedNameTrue,
        imdbID,
        setImdbID,
        title,
        setTitle,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
