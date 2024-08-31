import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sugMovies.css";
import "../styles/searchedMovie.css";

import "../styles/utilities.css";
function SugMovies({ handleClickOnMovie }) {
  const navigate = useNavigate();
  const handleSearch = (sugMovie) => {
    handleClickOnMovie(sugMovie.name, sugMovie.idImdb);
    navigate("/search");
  };
  const [idSugMovie, setIdSugMovie] = useState([
    {
      id: 1,
      idImdb: "tt12037194",
      name: "Furiosa: A Mad Max Saga",
      cover:
        "https://m.media-amazon.com/images/M/MV5BNWRlZTJhNGMtOWIyOS00YjRkLWExNjgtNDEwOTY1NGYxYmEwXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 2,
      idImdb: "tt18412256",
      name: "Alien: Romulus",
      cover:
        "https://m.media-amazon.com/images/M/MV5BMDU0NjcwOGQtNjNjOS00NzQ3LWIwM2YtYWVmODZjMzQzN2ExXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 3,
      idImdb: "tt5177120",

      name: "The Ministry of Ungentlemanly Warfare",
      cover:
        "https://m.media-amazon.com/images/M/MV5BOWI5YTlkNTktOTJlMC00MmYyLThkNzQtYmExOGZkZDE1ZjgwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    },
    {
      id: 4,
      idImdb: "tt11198330",
      name: "House of the Dragon",
      cover:
        "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 5,
      idImdb: "tt22022452",
      name: "Inside Out 2",
      cover:
        "https://m.media-amazon.com/images/M/MV5BYTc1MDQ3NjAtOWEzMi00YzE1LWI2OWUtNjQ0OWJkMzI3MDhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    },
    {
      id: 6,
      idImdb: "tt15239678",
      name: "Dune: Part Two",
      cover:
        "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    },
    {
      id: 7,
      idImdb: "tt6263850",

      name: "Deadpool & Wolverine",
      cover:
        "https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGc@._V1_SX300.jpg",
    },
  ]);

  return (
    <div className="sugMovies-container py-2">
      <div className="sugMovies-content">
        <h2>Trending</h2>
        <div className="sugMovies">
          <ul>
            {idSugMovie.map((sugMovie) => (
              <li
                className="sugMovies-lista"
                key={sugMovie.id}
                onClick={() => handleSearch(sugMovie)}
              >
                <img src={sugMovie.cover}></img>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SugMovies;
