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
        console.log(results);

        results.forEach((item) => {
          const driverWikiUrl = item.url; // Récupération de l'URL Wikipedia pour chaque pilote
          const wikiPageTitle = driverWikiUrl.split("/").pop(); // Extraction du titre de la page Wikipedia
          fetchWikipediaImage(wikiPageTitle, item.Circuit.circuitId);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
          console.log(`No image found for ${wikiPageTitle}`);
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
    <div className="grid grid-cols-3 w-5/6 place-content-center gap-10">
      {resultat.map(
        (resultat, index) => (
          console.log(new Date().toLocaleDateString("fr-FR")),
          (
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
          )
        )
      )}
    </div>
  );
}
