import { useState, useEffect } from "react";
import Cardresult from "../components/Cardresult";

const FetchResults = () => {
  const [resultat, setResultat] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current.json")
      .then((res) => res.json())
      .then((data) => {
        setResultat(data.MRData.RaceTable.Races);
        console.log("Fetched data:", data.MRData.RaceTable.Races);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("Current resultat:", resultat);

  if (resultat.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {resultat
        .slice()
        .reverse()
        .map((item) => (
          <Cardresult
            raceName={item.raceName}
            date={item.date}
            lien={item.url}
          />
        ))}
    </div>
  );
};

export default FetchResults;
