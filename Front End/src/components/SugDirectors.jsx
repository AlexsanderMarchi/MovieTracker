import React, { useState, useEffect } from "react";
import "../styles/sugDirectors.css";
import "../styles/searchedMovie.css";

import "../styles/utilities.css";
import tarantino from "../assets/tarantino2.png";
// import guyRitchie from "../assets/guyRitchie.jpg";
import nolan from "../assets/nolan2.jpg";
import kubrick from "../assets/kubrick2.jpg";
import scorsese2 from "../assets/scorsese2.jpg";
import cameron from "../assets/cameron2.jpg";
import ridleyScott from "../assets/ridleyScott2.jpg";
import spielberg from "../assets/spielberg2.jpg";
function SugDirectors() {
  const [directors, setDirectors] = useState([
    {
      id: 1,
      name: "Steven Spielberg",
      cover:
        "https://m.media-amazon.com/images/M/MV5BNWRlZTJhNGMtOWIyOS00YjRkLWExNjgtNDEwOTY1NGYxYmEwXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 2,
      name: "James Cameron",
      cover:
        "https://m.media-amazon.com/images/M/MV5BMDU0NjcwOGQtNjNjOS00NzQ3LWIwM2YtYWVmODZjMzQzN2ExXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 3,
      name: "Ridley Scott",
      cover:
        "https://m.media-amazon.com/images/M/MV5BOWI5YTlkNTktOTJlMC00MmYyLThkNzQtYmExOGZkZDE1ZjgwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    },
    {
      id: 4,
      name: "Stanley Kubrick",
      cover:
        "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      id: 5,
      name: "Matin Scorsese",
      cover:
        "https://m.media-amazon.com/images/M/MV5BYTc1MDQ3NjAtOWEzMi00YzE1LWI2OWUtNjQ0OWJkMzI3MDhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    },
    {
      id: 6,
      name: "Quentin Tarantino",
      cover:
        "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    },
    {
      id: 7,
      name: "Christopher Nolan",
      cover:
        "https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGc@._V1_SX300.jpg",
    },
    // { id: 8, name: "Guy Ritchie", cover: guyRitchie },
  ]);
  const [directorMovies, setDirectorMovies] = useState("tt0110912");
  const [directorMovie, setDirectorMovie] = useState([]);
  const [directorCount, setDirectorCount] = useState(1);
  // [{ id: 1, name: "tt0110912"},]);

  useEffect(() => {
    const fetchDirectorMovies = async () => {
      try {
        let api = `https://www.omdbapi.com/?i=${directorMovies}&apikey=100f4720`; /// FIX THE IMDBID BUG OF BEING NULL
        let response = await fetch(api);
        const data = await response.json();
        setDirectorMovie(data);
        console.log("DirectorMovie: ", data);
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    fetchDirectorMovies();
  }, [directorCount]);

  const directorClicked = async () => {
    setDirectorCount(directorCount + 1);
  };

  return (
    <div className="directors-container py-2">
      {/* <div className="container-content"> */}
      <div className="directors-content">
        <h2>Trending</h2>
        <div className="directors">
          <ul>
            {directors.map((director) => (
              <li className="directors-lista" key={director.id}>
                <img src={director.cover}></img>
              </li>
            ))}
          </ul>
        </div>
        {/* </div> */}
      </div>
      {/* <div className="suggestions-container">
        {directorMovie && (
          <div className="suggestions-list-container">
            <ul>
              {Object.values(directorMovie.Search || {}).map(
                (directorMovie) => (
                  <li
                    key={directorMovie.imdbID}
                    onClick={directorClicked()}
                    className="suggestion-movie-container"
                  >
                    <div className="poster-content">
                      <img src={directorMovie.Poster} />
                      <p className="suggestion-name">
                        {directorMovie.Title}({directorMovie.Year})
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default SugDirectors;
