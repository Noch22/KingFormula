import { useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import Lastresultresponsive from "../components/Lastresultresponsive";

const FetchLast = () => {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fastestDriverIndex, setFastestDriverIndex] = useState(null);
  const [photos, setPhotos] = useState({});
  const [fullData, setFullData] = useState({});

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/last/results.json")
      .then((res) => res.json())
      .then((data) => {
        const results = data.MRData.RaceTable.Races[0].Results || [];
        setResultat(data.MRData.RaceTable.Races[0].Results);
        setFullData(data.MRData.RaceTable);
        setIsLoading(false);

        results.forEach((item) => {
          const driverWikiUrl = item.Driver.url; // Récupération de l'URL Wikipedia pour chaque pilote
          const wikiPageTitle = driverWikiUrl.split("/").pop(); // Extraction du titre de la page Wikipedia
          fetchWikipediaImage(wikiPageTitle, item.Driver.driverId);
        });

        let maxSpeed = -1;
        let fastestIndex = null;

        results.forEach((item, index) => {
          if (item.FastestLap && item.FastestLap.AverageSpeed) {
            const speed = parseFloat(item.FastestLap.AverageSpeed.speed);
            if (speed > maxSpeed) {
              maxSpeed = speed;
              fastestIndex = index;
            }
          }
        });

        setFastestDriverIndex(fastestIndex);
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

  const medalIcons = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
  };

  return (
    <div className="overflow-x-auto w-full md:w-5/6 place-content-center">
      <div className="flex flex-col md:flex-row justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">Les derniers résultats</h1>
          <p className="text-sm opacity-70">Informations de la course</p>
        </div>
        <div className="flex gap-2 md:gap-5 flex-row">
          <div className="flex-1">
            <p className="text-sm opacity-70">Circuit</p>
            <p className="text-sm">{fullData.Races[0].Circuit.circuitName}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm opacity-70">Ville</p>
            <p className="text-sm">
              {fullData.Races[0].Circuit.Location.country}
            </p>
          </div>
          <div className="flex-1">
            {" "}
            <p className="text-sm opacity-70">Date</p>
            <p className="text-sm">{fullData.Races[0].date}</p>
          </div>
        </div>
      </div>
      <table className="hidden md:table">
        {/* head */}
        <thead>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th className="flex flex-col items-center">Vitesse moyenne</th>
            <th>Points</th>
            <th>Tours</th>
            <th className="flex flex-col items-center">
              Tour le plus rapide⚡
            </th>
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
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
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
              <td className="flex flex-col justify-center items-center">
                {item.FastestLap?.AverageSpeed?.speed || "N/A"} Km/h{" "}
                {index === fastestDriverIndex && (
                  <span className="indicator-item badge badge-secondary ml-2">
                    plus rapide⚡
                  </span>
                )}
              </td>
              <td>
                {item.points}{" "}
                {medalIcons[item.position] && (
                  <span>{medalIcons[item.position]}</span>
                )}
              </td>
              <td>{item.laps}</td>
              <td className="flex flex-col items-center justify-center">
                {item.FastestLap?.Time?.time || "N/A"} (Tour{" "}
                {item.FastestLap?.lap}){" "}
                {item.FastestLap?.rank === "1" && (
                  <span className="indicator-item badge badge-primary ml-2">
                    meilleur tour🚀
                  </span>
                )}
              </td>
              <th>
                <a
                  target="_blank"
                  href={item.Driver.url}
                  className="btn btn-ghost btn-xs"
                >
                  En voir plus
                </a>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th>Vitesse moyenne</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="cards-mobile flex flex-col md:hidden w-full">
        {resultat.map((item, index) => (
          <Lastresultresponsive
            key={index}
            avatarurl={
              photos[item.Driver.driverId] ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
            }
            name={`${item.Driver.givenName} ${item.Driver.familyName}`}
            nationality={item.Driver.nationality}
            flag={flags[item.Driver.nationality] || "🏳"}
            constructeur={`${item.Constructor.name}${" "}
            ${flags[item.Constructor.nationality] || "🏳"}`}
            vitesse={`${
              item.FastestLap?.AverageSpeed?.speed || "N/A"
            } Km/h${" "}
            `}
            isFastest={index === fastestDriverIndex}
            points={item.points}
            tours={item.laps}
            besttour={`${item.FastestLap?.Time?.time || "N/A"} (Tour ${
              item.FastestLap?.lap
            })${" "}
            `}
            fastestLap={item.FastestLap?.rank === "1"}
            place={item.position}
          />
        ))}
      </div>
    </div>
  );
};

export default FetchLast;
