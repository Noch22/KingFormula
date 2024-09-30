import React from "react";

import { useState, useEffect } from "react";

const Fetchsearch = () => {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially
  const [hasError, setHasError] = useState(false);
  const [fullData, setFullData] = useState({});
  const [piloteNom, setPiloteNom] = useState(""); // State to store pilot name
  const [searched, setSearched] = useState(false); // To track if a search was made

  const fetchData = (nomPilote) => {
    setIsLoading(true);
    setSearched(true); // Mark that a search was made
    fetch(`http://ergast.com/api/f1/drivers/${nomPilote}.json`)
      .then((res) => res.json())
      .then((data) => {
        const pitStopsByDriver = data.MRData.DriverTable.Drivers || {};
        setResultat(pitStopsByDriver);
        console.log(resultat);
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    if (piloteNom.trim()) {
      fetchData(piloteNom);
    }
  };

  if (isLoading) {
    return (
      <p>
        <span className="loading loading-ring loading-lg"></span> Loading...
      </p>
    );
  }

  if (hasError) {
    return <p>Something went wrong while fetching the data.</p>;
  }
  // Mise à jour de l'objet flags avec les noms complets des nationalités comme clés
  const flags = {
    French: "🇫🇷",
    German: "🇩🇪",
    British: "🇬🇧",
    Australian: "🇦🇺",
    Spanish: "🇪🇸",
    Finnish: "🇫🇮",
    Russian: "🇷🇺",
    Canadian: "🇨🇦",
    Mexican: "🇲🇽",
    American: "🇺🇸",
    Italian: "🇮🇹",
    Austrian: "🇦🇹",
    Belgian: "🇧🇪",
    Swiss: "🇨🇭",
    Swedish: "🇸🇪",
    Danish: "🇩🇰",
    Polish: "🇵🇱",
    Hungarian: "🇭🇺",
    Argentine: "🇦🇷",
    Portuguese: "🇵🇹",
    Norwegian: "🇳🇴",
    "New Zealander": "🇳🇿",
    Dutch: "🇳🇱",
    Japanese: "🇯🇵",
    Indian: "🇮🇳",
    Chinese: "🇨🇳",
    Brazilian: "🇧🇷",
    Monegasque: "🇲🇨",
    Argentinian: "🇦🇷",
    Thai: "🇹🇭",
    Colombian: "🇨🇴",
    Venezuelan: "🇻🇪",
    SouthAfrican: "🇿🇦",
    Rhodesian: "🇿🇼",
    EastGerman: "🇩🇪",
    SwedishItalian: "🇸🇪",
    Liechtensteiner: "🇱🇮",
  };

  return (
    <div className="overflow-x-auto w-5/6 place-content-center">
      <div className="overflow-x-auto">
        <div className="form">
          <div className="flex justify-center w-full">
            <label htmlFor="nom">Nom du pilote</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={piloteNom}
              onChange={(e) => setPiloteNom(e.target.value)} // Update piloteNom state
            />
            <button className="btn" onClick={handleSearch}>
              Chercher
            </button>
          </div>
          {/* Display no results only if a search was made and there's no result */}
          {searched && resultat.length === 0 && !isLoading && (
            <p>No results available.</p>
          )}
        </div>
        {resultat.length > 0 && (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID de pilote</th>
                <th>Numéro</th>
                <th>Code pilote</th>
                <th>Nom prénom</th>
                <th>Date de naissance</th>
                <th>Nationalitée</th>
              </tr>
            </thead>
            <tbody>
              {resultat.map((data, index) => (
                <tr key={index}>
                  <td>{data.driverId}</td>
                  <td>{data.permanentNumber ? data.permanentNumber : "N/A"}</td>
                  <td>{data.code}</td>
                  <td>
                    {data.givenName} {data.familyName}
                  </td>
                  <td>{data.dateOfBirth}</td>
                  <td>{data.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Fetchsearch;
