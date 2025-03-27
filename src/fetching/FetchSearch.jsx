import React from "react";

import { useState, useEffect } from "react";

const Fetchsearch = () => {
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially
  const [hasError, setHasError] = useState(false);
  const [fullData, setFullData] = useState();
  const [piloteNom, setPiloteNom] = useState(""); // State to store pilot name
  const [ecurieNom, setEcurieNom] = useState(""); // Pour l'écurie
  const [annee, setAnnee] = useState(""); // Pour l'année
  const [searchType, setSearchType] = useState("Type de recherche"); // Stocke le type de recherche
  const [searched, setSearched] = useState(false); // Stocke si une recherche a été effectuée
  const [noResult, setNoResult] = useState(false); // État pour détecter s'il n'y a pas de résultats
  const [resultat, setResultat] = useState([]); // Stocke les résultats de la recherche
  const [seasons, setSeasons] = useState([]); // Stocker les saisons disponibles
  const [selectedSeason, setSelectedSeason] = useState(""); // Année sélectionnée

  useEffect(() => {
    fetch("http://api.jolpi.ca/ergast/f1/seasons.json?limit=100&offset=8")
      .then((res) => res.json())
      .then((data) => {
        const allSeasons = data.MRData.SeasonTable.Seasons || [];
        setSeasons(allSeasons);
        setSelectedSeason(allSeasons[allSeasons.length - 1].season); // Année actuelle par défaut
      })
      .catch((error) => {
        console.error("Error fetching seasons:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const resetStates = () => {
    setFullData({});
    setPiloteNom("");
    setEcurieNom("");
    setAnnee("");
    setCircuitNom("");
    setHasError(false);
    setIsLoading(false);
    setSearched(false);
    setNoResult(false);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    resetStates(); // Réinitialise les champs et résultats
  };

  const fetchData = (endpoint) => {
    setIsLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        let fetchedResults = [];
        if (searchType === "Pilote") {
          fetchedResults = data.MRData.DriverTable?.Drivers || [];
        } else if (searchType === "Écurie") {
          fetchedResults = data.MRData.ConstructorTable?.Constructors || [];
        } else if (searchType === "Année") {
          fetchedResults = data.MRData.RaceTable?.Races || [];
        }

        setFullData(data.MRData);
        setResultat(fetchedResults);
        console.log(data);
        if (fetchedResults.length === 0) {
          setNoResult(true); // Si aucun résultat trouvé
        } else {
          setNoResult(false); // Il y a des résultats
        }

        setIsLoading(false);
        setSearched(true); // Marque qu'une recherche a été effectuée
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
        setSearched(true);
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
          <select
            value={selectedSeason}
            onChange={(e) =>
              setAnnee(e.target.value) &
              setSelectedSeason(e.target.value) &
              handleSearch()
            }
            className="select select-bordered"
          >
            {seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.season}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!searched) {
      return null;
    }

    if (noResult) {
      return <p>Aucun résultat trouvé.</p>;
    }

    switch (searchType) {
      case "Pilote":
        if (fullData.DriverTable) {
          return (
            <div className="result">
              {resultat.map((pilote, index) => (
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
        }
      case "Écurie":
        if (fullData.ConstructorTable) {
          return (
            <div className="result">
              {resultat.map((ecurie, index) => (
                <div key={index} className="card bg-base-100 shadow-xl p-4">
                  <h3 className="text-lg font-bold">{ecurie.name}</h3>
                  <p>
                    <strong>Nationalité :</strong> {ecurie.nationality}
                  </p>
                </div>
              ))}
            </div>
          );
        }
      case "Année":
        // Vérifie que fullData.Races est un tableau avant d'utiliser .map()
        if (fullData.RaceTable) {
          return (
            <div className="result">
              {resultat.map((race, index) => (
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
              ))}
            </div>
          );
        } else {
          return <p>Aucune course trouvée pour l'année {annee}</p>;
        }

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

  return (
    <div className="overflow-x-auto w-5/6 place-content-center">
      <div className="overflow-x-auto">
        <div className="form">
          <div className="flex justify-center w-full items-center gap-2">
            <select
              name="type"
              className="select select-bordered w-full max-w-xs"
              onChange={handleSearchTypeChange}
              value={searchType}
            >
              <option hidden>Type de recherche</option>
              <option>Pilote</option>
              <option>Écurie</option>
              <option>Année</option>
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
