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
    { id: 1, name: "Steven Spielberg", cover: spielberg },
    { id: 2, name: "James Cameron", cover: cameron },
    { id: 3, name: "Ridley Scott", cover: ridleyScott },
    { id: 4, name: "Stanley Kubrick", cover: kubrick },
    { id: 5, name: "Matin Scorsese", cover: scorsese2 },
    { id: 6, name: "Quentin Tarantino", cover: tarantino },
    { id: 7, name: "Christopher Nolan", cover: nolan },
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
        <h2>Directors Suggestion</h2>
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
      <div className="suggestions-container">
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
      </div>
    </div>
  );
}

export default SugDirectors;
