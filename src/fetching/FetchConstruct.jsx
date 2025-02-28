import React from "react";
import Skeleton from "../components/skeleton";
import { Toaster, toast } from "sonner";

import { useState, useEffect } from "react";

const Fetchconstruct = () => {
  const [resultat, setResultat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [photos, setPhotos] = useState({});
  const [fullData, setFullData] = useState({});
  const [seasons, setSeasons] = useState([]); // Stocker les saisons disponibles
  const [selectedSeason, setSelectedSeason] = useState(""); // Année sélectionnée

  useEffect(() => {
    fetch("https://ergast.com/api/f1/seasons.json?limit=100&offset=8")
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

  useEffect(() => {
    if (!selectedSeason) return;
    setIsLoading(true);
    fetch(
      `https://ergast.com/api/f1/${selectedSeason}/constructorStandings.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const results =
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings ||
          [];
        setResultat(
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        );
        setFullData(data.MRData.StandingsTable);
        setIsLoading(false);

        results.forEach((item) => {
          const constructorId = item.Constructor.constructorId;
          fetchTeamLogo(constructorId); // Appel à ta nouvelle fonction
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, [selectedSeason]);

  const fetchTeamLogo = (constructorId) => {
    const logoUrl = teamLogos[constructorId];
    if (logoUrl) {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [constructorId]: logoUrl, // Utilisation de l'ID de l'écurie comme clé
      }));
    } else {
      toast(`No logo found for ${constructorId}`);
    }
  };

  const teamLogos = {
    mercedes:
      "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/mercedes",
    red_bull:
      "https://cms.rhinoshield.app/public/images/small_ip_page_oracle_redbull_racing_icon_aa281a3ebc.jpg",
    ferrari:
      "https://assets.turbologo.com/blog/fr/2019/10/19134216/ferrari-logo-illustration-958x575.jpg",
    mclaren:
      "https://static.vecteezy.com/ti/vecteur-libre/p1/20500446-mclaren-marque-logo-voiture-symbole-nom-orange-conception-britanique-voiture-vecteur-illustration-gratuit-vectoriel.jpg",
    aston_martin:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrPJYEcn4sxjg7ew4Lv_LGHxQqsebR5XscA&s",
    rb: "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/rb",
    haas: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbsJIjtmS_NZAPoNbIp6x2Hp6lgLldZIGjAw&s",
    williams:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Williamsracing-20200530-0001.jpg/220px-Williamsracing-20200530-0001.jpg",
    alpine:
      "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b7/Alpine_F1_Team_2021_Logo.svg/3543px-Alpine_F1_Team_2021_Logo.svg.png",
    sauber: "https://cdn.worldvectorlogo.com/logos/sauber-f1-team.svg",
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
    <div className="overflow-x-auto w-5/6 place-content-center">
      <Toaster />
      <div className="flex flex-row- justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">
            Les résultats constructeurs actuels
          </h1>
          <p className="text-sm opacity-70">Informations des constructeurs</p>
        </div>
        <div className="flex gap-5 flex-row">
          <div>
            <p className="text-sm opacity-70">Choisir une saison</p>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="select select-bordered"
            >
              {seasons.map((season) => (
                <option key={season.season} value={season.season}>
                  {season.season}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Place</th>
            <th>Constructeur</th>
            <th>Points</th>
            <th>Victoires</th>
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
                          photos[item.Constructor.constructorId] ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt={item.Constructor.name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {`${item.Constructor.name}`}
                    </div>
                    <div className="text-sm opacity-50">
                      {/* Récupération du drapeau en fonction de la nationalité */}
                      {item.Constructor.nationality}{" "}
                      {flags[item.Constructor.nationality] || "🏳"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {item.points}{" "}
                {item.position === "1" && <span>{medalIcons[1]}</span>}
                {item.position === "2" && <span>{medalIcons[2]}</span>}
                {item.position === "3" && <span>{medalIcons[3]}</span>}
              </td>
              <td>
                {item.wins ? (
                  item.wins
                ) : (
                  <span className="badge badge-neutral badge-sm">0</span>
                )}
              </td>
              <td>
                <a
                  target="_blank"
                  href={item.Constructor.url}
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
            <th>Constructeur</th>
            <th>Points</th>
            <th>Victoires</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Fetchconstruct;
