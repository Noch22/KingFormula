import React from "react";
import Skeleton from "../components/skeleton";

import { useState, useEffect } from "react";

const Fetchpit = () => {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fullData, setFullData] = useState({});
  const [pilotes, setPilotes] = useState({});

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/last/pitstops.json")
      .then((res) => res.json())
      .then((data) => {
        // Regrouper les arrêts par pilote
        const pitStopsByDriver = data.MRData.RaceTable.Races[0].PitStops.reduce(
          (acc, pitStop) => {
            if (!acc[pitStop.driverId]) {
              acc[pitStop.driverId] = []; // Initialiser une nouvelle liste pour ce pilote
            }
            acc[pitStop.driverId].push(pitStop); // Ajouter l'arrêt à la liste du pilote
            return acc;
          },
          {}
        );

        setResultat(pitStopsByDriver);
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (hasError) {
    return <p>Something went wrong while fetching the data.</p>;
  }

  if (resultat.length === 0) {
    return <p>No results available.</p>;
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
      <div className="flex flex-row- justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">
            Les dernières données de PitStops
          </h1>
          <p className="text-sm opacity-70">Informations de la course</p>
        </div>
        <div className="flex gap-5 flex-row">
          <div>
            <p className="text-sm opacity-70">Circuit</p>
            <p className="text-sm">{fullData.Races[0].Circuit.circuitName}</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Ville</p>
            <p className="text-sm">
              {fullData.Races[0].Circuit.Location.country}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">Date</p>
            <p className="text-sm">{fullData.Races[0].date}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Nom</th>
              <th>Nombre d'arrêt(s)</th>
              <th>Tour(s)</th>
              <th>Moment(s) de l'arrêt</th>
              <th>Durée(s) de l'arrêt</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resultat).map(([driverId, pitStops], index) => (
              <tr key={index}>
                <td>{driverId}</td>
                <td>
                  {" "}
                  <span className="badge badge-outline">
                    {pitStops.length}
                  </span>{" "}
                </td>
                <td>{pitStops.map((pit) => `Tour ${pit.lap}`).join(", ")}</td>
                <td>{pitStops.map((pit) => pit.time).join(", ")}</td>
                <td>{pitStops.map((pit) => `${pit.duration}s`).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fetchpit;
