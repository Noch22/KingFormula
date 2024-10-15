import React from "react";

import { useState, useEffect } from "react";

const Fetchsearch = () => {
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially
  const [hasError, setHasError] = useState(false);
  const [fullData, setFullData] = useState({});
  const [piloteNom, setPiloteNom] = useState(""); // State to store pilot name
  const [ecurieNom, setEcurieNom] = useState(""); // Pour l'écurie
  const [annee, setAnnee] = useState(""); // Pour l'année
  const [circuitNom, setCircuitNom] = useState(""); // Pour le circuit
  const [searchType, setSearchType] = useState(""); // Stocke le type de recherche

  const fetchData = (endpoint) => {
    setIsLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    let endpoint = "";
    if (searchType === "Pilote" && piloteNom.trim()) {
      endpoint = `http://ergast.com/api/f1/drivers/${piloteNom}.json`;
    } else if (searchType === "Écurie" && ecurieNom.trim()) {
      endpoint = `http://ergast.com/api/f1/constructors/${ecurieNom}.json`;
    } else if (searchType === "Année" && annee.trim()) {
      endpoint = `http://ergast.com/api/f1/${annee}.json`;
    } else if (searchType === "Circuit" && circuitNom.trim()) {
      endpoint = `http://ergast.com/api/f1/circuits/${circuitNom}.json`;
    }

    if (endpoint) {
      fetchData(endpoint);
    }
  };

  const renderForm = () => {
    switch (searchType) {
      case "Pilote":
        return (
          <input
            type="text"
            value={piloteNom}
            onChange={(e) => setPiloteNom(e.target.value)}
            placeholder="Entrez le nom du pilote"
            className="input input-bordered w-full max-w-xs"
          />
        );
      case "Écurie":
        return (
          <input
            type="text"
            value={ecurieNom}
            onChange={(e) => setEcurieNom(e.target.value)}
            placeholder="Entrez le nom de l'écurie"
            className="input input-bordered w-full max-w-xs"
          />
        );
      case "Année":
        return (
          <input
            type="text"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            placeholder="Entrez l'année"
            className="input input-bordered w-full max-w-xs"
          />
        );
      case "Circuit":
        return (
          <input
            type="text"
            value={circuitNom}
            onChange={(e) => setCircuitNom(e.target.value)}
            placeholder="Entrez le nom du circuit"
            className="input input-bordered w-full max-w-xs"
          />
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!fullData || fullData.length === 0) {
      return <p>Aucun résultat trouvé.</p>;
    }

    switch (searchType) {
      case "Pilote":
        return (
          <div className="result">
            {fullData.map((pilote, index) => (
              <div key={index} className="card bg-base-100 shadow-xl p-4">
                <h3 className="text-lg font-bold">
                  {pilote.givenName} {pilote.familyName}
                </h3>
                <p>
                  <strong>Date de naissance :</strong> {pilote.dateOfBirth}
                </p>
                <p>
                  <strong>Nationalité :</strong> {pilote.nationality}
                </p>
                <p>
                  <strong>Code :</strong> {pilote.code}
                </p>
              </div>
            ))}
          </div>
        );

      case "Écurie":
        return (
          <div className="result">
            {fullData.map((ecurie, index) => (
              <div key={index} className="card bg-base-100 shadow-xl p-4">
                <h3 className="text-lg font-bold">{ecurie.name}</h3>
                <p>
                  <strong>Nationalité :</strong> {ecurie.nationality}
                </p>
              </div>
            ))}
          </div>
        );

      case "Circuit":
        return (
          <div className="result">
            {fullData.map((circuit, index) => (
              <div key={index} className="card bg-base-100 shadow-xl p-4">
                <h3 className="text-lg font-bold">{circuit.circuitName}</h3>
                <p>
                  <strong>Localisation :</strong> {circuit.Location.locality},{" "}
                  {circuit.Location.country}
                </p>
              </div>
            ))}
          </div>
        );

      case "Année":
        return (
          <div className="result">
            {fullData.Races && fullData.Races.length > 0 ? (
              fullData.Races.map((race, index) => (
                <div key={index} className="card bg-base-100 shadow-xl p-4">
                  <h3 className="text-lg font-bold">{race.raceName}</h3>
                  <p>
                    <strong>Date :</strong> {race.date}
                  </p>
                  <p>
                    <strong>Lieu :</strong> {race.Circuit.circuitName} (
                    {race.Circuit.Location.locality},{" "}
                    {race.Circuit.Location.country})
                  </p>
                </div>
              ))
            ) : (
              <p>Aucune course trouvée pour l'année {annee}</p>
            )}
          </div>
        );

      default:
        return null;
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
          <div className="flex justify-center w-full items-center gap-2">
            <select
              name="type"
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option disabled selected>
                Type de recherche
              </option>
              <option>Pilote</option>
              <option>Écurie</option>
              <option>Circuit</option>
              <option>Année</option>
              <option>Course</option>
              <option>Classement</option>
            </select>
          </div>
          <div className="flex justify-center w-full items-center gap-2 mt-4">
            {renderForm()}
          </div>
          <div className="flex justify-center w-full items-center gap-2 mt-4">
            <button onClick={handleSearch} className="btn btn-primary">
              Rechercher
            </button>
          </div>
          <div className="mt-8">{renderResult()}</div>
        </div>
      </div>
    </div>
  );
};

export default Fetchsearch;
