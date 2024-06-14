import React, { useState, useEffect } from "react";
import "../styles/sugDirectors.css";
import "../styles/utilities.css";
import tarantino from "../assets/tarantino.jpg";
import guyRitchie from "../assets/guyRitchie.jpg";
import nolan from "../assets/nolan.jpg";
import kubrick from "../assets/kubrick.jpg";
import scorsese from "../assets/scorsese.jpg";
import cameron from "../assets/cameron.jpg";
import ridleyScott from "../assets/ridleyScott.jpg";
import spielberg from "../assets/spielberg.jpg";
function SugDirectors() {
  const [directors, setDirectors] = useState([
    { id: 1, name: "Steven Spielberg", cover: spielberg },
    { id: 2, name: "James Cameron", cover: cameron },
    { id: 3, name: "Ridley Scott", cover: ridleyScott },
    { id: 4, name: "Stanley Kubrick", cover: kubrick },
    { id: 5, name: "Matin Scorsese", cover: scorsese },
    { id: 6, name: "Quentin Tarantino", cover: tarantino },
    { id: 7, name: "Christopher Nolan", cover: nolan },
    { id: 8, name: "Guy Ritchie", cover: guyRitchie },
  ]);
  // const [country, setCountry] = useState();
  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     try {
  //       let api;
  //       api = `https://restcountries.com/v3.1/name/brazil`;
  //       let response = await fetch(api);
  //       const data = await response.json();
  //       setCountry(data);
  //       console.log("Countries: ", data);
  //     } catch (error) {
  //       console.error("Deu ruim: ", error);
  //     }
  //   };

  //   fetchSuggestions();
  // }, []);
  return (
    <div className="directors-container">
      {/* <div className="container-content"> */}
      <div className="directors-content">
        <h2>Directors Suggestion</h2>
        <div className="directors">
          {directors.map((director) => (
            <li className="directors-lista" key={director.id}>
              <img src={director.cover}></img>
            </li>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default SugDirectors;
