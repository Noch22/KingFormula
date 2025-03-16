import React from "react";
import Skeleton from "../components/skeleton";
import { Toaster, toast } from "sonner";

import { useState, useEffect } from "react";

const Fetchqualifs = () => {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [photos, setPhotos] = useState({});
  const [fullData, setFullData] = useState({});

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/last/qualifying.json")
      .then((res) => res.json())
      .then((data) => {
        const results = data.MRData.RaceTable.Races[0].QualifyingResults || [];
        setResultat(data.MRData.RaceTable.Races[0].QualifyingResults);
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);

        results.forEach((item) => {
          const driverWikiUrl = item.Driver.url; // Récupération de l'URL Wikipedia pour chaque pilote
          const wikiPageTitle = driverWikiUrl.split("/").pop(); // Extraction du titre de la page Wikipedia
          fetchWikipediaImage(wikiPageTitle, item.Driver.driverId);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const fetchWikipediaImage = (wikiPageTitle, driverId) => {
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
            [driverId]: page.thumbnail.source, // Utiliser l'ID du pilote comme clé
          }));
        } else {
          toast.error(`Aucune image trouvée pour ${wikiPageTitle}`);
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
      <Toaster richColors />
      <div className="flex flex-row- justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">
            Les derniers résultats de qualifications
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultat.map((item, index) => (
            <tr key={index}>
              <td>{item.position}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          photos[item.Driver.driverId] ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt={`${item.Driver.givenName} ${item.Driver.familyName}`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {`${item.Driver.givenName} ${item.Driver.familyName}`}
                    </div>
                    <div className="text-sm opacity-50">
                      {/* Récupération du drapeau en fonction de la nationalité */}
                      {item.Driver.nationality}{" "}
                      {flags[item.Driver.nationality] || "🏳"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">
                  {item.Constructor.name}{" "}
                  {flags[item.Constructor.nationality] || "🏳"}
                </span>
              </td>
              <td>{item.Q1}</td>
              <td>
                {item.Q2 ? (
                  item.Q2
                ) : (
                  <span className="badge badge-neutral badge-sm">
                    Éliminé🏁
                  </span>
                )}
              </td>
              <td>
                {item.Q3 ? (
                  item.Q3
                ) : (
                  <span className="badge badge-neutral badge-sm">
                    Éliminé🏁
                  </span>
                )}
              </td>
              <td>
                <a
                  target="_blank"
                  href={item.Driver.url}
                  className="btn btn-ghost btn-xs"
                >
                  En voir plus
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Fetchqualifs;
