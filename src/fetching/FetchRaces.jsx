import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import Racesingle from "../components/Racesingle";

export default function FetchRaces() {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [photos, setPhotos] = useState({});
  const [fullData, setFullData] = useState({});

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current.json")
      .then((res) => res.json())
      .then((data) => {
        const results = data.MRData.RaceTable.Races || [];
        setResultat(data.MRData.RaceTable.Races);
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);

        results.forEach((item) => {
          const driverWikiUrl = item.url; // Récupération de l'URL Wikipedia pour chaque pilote
          const wikiPageTitle = driverWikiUrl.split("/").pop(); // Extraction du titre de la page Wikipedia
          fetchWikipediaImage(wikiPageTitle, item.Circuit.circuitId);
        });
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const fetchWikipediaImage = (wikiPageTitle, circuitId) => {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
      wikiPageTitle
    )}&origin=*&pithumbsize=100`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        if (page && page.thumbnail) {
          setPhotos((prevPhotos) => ({
            ...prevPhotos,
            [circuitId]: page.thumbnail.source, // Utiliser l'ID du pilote comme clé
          }));
        } else {
        }
      })
      .catch((error) =>
        console.error("Error fetching Wikipedia image:", error)
      );
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (hasError) {
    return <p>Something went wrong while fetching the data.</p>;
  }

  if (resultat.length === 0) {
    return <p>No results available.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="font-mono text-2xl font-bold p-8">
        Édition {new Date().getFullYear()}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 w-5/6 place-content-center gap-10">
        {resultat.map((resultat, index) => (
          <Racesingle
            key={index}
            title={resultat.raceName}
            country={resultat.Circuit.Location.country}
            city={resultat.Circuit.Location.locality}
            image={photos[resultat.Circuit.circuitId]}
            link={resultat.Circuit.url}
            date={resultat.date}
            badge={
              new Date(resultat.date) >= new Date() ? "À venir" : "Terminée"
            }
          />
        ))}
      </div>
    </div>
  );
}
