import React, { useContext, useEffect, useState } from "react";
import "../styles/home.css";
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

// import tarantino from "../assets/tarantino.jpg";
// import guyRitchie from "../assets/guyRitchie.jpg";
// import nolan from "../assets/nolan.jpg";
// import kubrick from "../assets/kubrick.jpg";
// import scorsese from "../assets/scorsese.jpg";
// import cameron from "../assets/cameron.jpg";
// import ridleyScott from "../assets/ridleyScott.jpg";
// import spielberg from "../assets/spielberg.jpg";

function Search() {
  //   const [directors, setDirectors] = useState([
  //     { id: 1, name: "Steven Spielberg", cover: spielberg },
  //     { id: 2, name: "James Cameron", cover: cameron },
  //     { id: 3, name: "Ridley Scott", cover: ridleyScott },
  //     { id: 4, name: "Stanley Kubrick", cover: kubrick },
  //     { id: 5, name: "Matin Scorsese", cover: scorsese },
  //     { id: 6, name: "Quentin Tarantino", cover: tarantino },
  //     { id: 7, name: "Christopher Nolan", cover: nolan },
  //     { id: 8, name: "Guy Ritchie", cover: guyRitchie },
  //   ]);
  // const [nameSearched, setNameSearched] = useState(""); //Responsible to get the name you write on search bar and show movies with that name
  // const [selectedMovie, setSelectedMovie] = useState(null); //This take the movie you clicked and bring the data about it
  // const [suggestionsMovies, setSuggestionsMovies] = useState(null); //This show movies that are similar to selectedMovie
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
  // //SUGGESTED MOVIES
  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     try {
  //       let api;
  //       api = `https://www.omdbapi.com/?s=${suggestedName}&apikey=100f4720`;
  //       setSuggestedNameTrue(false);
  //       let response = await fetch(api);
  //       const data = await response.json();
  //       setSuggestionsMovies(data);
  //       // console.log("suggestion UseState: ", suggestedName);
  //       console.log("suggestions: ", data);
  //     } catch (error) {
  //       console.error("Deu ruim: ", error);
  //     }
  //   };
  //   if (suggestedName != "") {
  //     fetchSuggestions();
  //   }
  // }, [suggestedNameTrue, suggestedName]);
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
      {/* <div className="container">
        <div className="directorsDiv">
          {directors.map((director) => (
            <li className="directors-lista-div" key={director.id}>
              <img className="directorCover" src={director.cover}></img>
              <p className="directorName">{director.name}</p>
            </li>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default Search;
