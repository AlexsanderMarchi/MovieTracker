import React, { useState, useEffect } from "react";
import "../styles/home.css";
import Header from "../components/header";
import Showcase from "../components/showcase";
import Footer from "../components/footer";

import SearchPage from "../components/searchPage";

function Home() {
  const [nameSearched, setNameSearched] = useState(""); //Responsible to get the name you write on search bar and show movies with that name
  const [selectedMovie, setSelectedMovie] = useState(null); //This take the movie you clicked and bring the data about it
  const [suggestionsMovies, setSuggestionsMovies] = useState(null); //This show movies that are similar to selectedMovie
  const [suggestedName, setSuggestedName] = useState("");
  const [suggestedNameTrue, setSuggestedNameTrue] = useState(false);
  const [imdbID, setImdbID] = useState("007");
  const [title, setTitle] = useState(null);
  const [movie, setMovie] = useState({});

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
  }, [nameSearched]);

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
  }, [imdbID]);

  const clickOnMovie = async (title, imdbID, year) => {
    setImdbID(imdbID);
    const mainTitle = title.split(":")[0].trim();
    console.log(mainTitle);
    const words = mainTitle.split(/\s+/);
    console.log(words);
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
  //SUGGESTED MOVIES
  useEffect(() => {
    const fetchSuggestions = async () => {
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
  }, [suggestedNameTrue, suggestedName]);

  return (
    <>
      <div className="main-container">
        <Header
          nameSearched={nameSearched}
          setNameSearched={setNameSearched}
          movie={movie}
          clickOnMovie={clickOnMovie}
        />
        <SearchPage
          selectedMovie={selectedMovie}
          suggestionsMovies={suggestionsMovies}
          clickOnMovie={clickOnMovie}
        />
        <Footer />
        {/* <Header />
        <Showcase />
        <Footer /> */}
      </div>
    </>
  );
}

export default Home;
