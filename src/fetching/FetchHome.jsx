import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const FetchHome = () => {
  const [resultat, setResultat] = useState([]);

  useEffect(() => {
    fetch("http://api.jolpi.ca/ergast/f1/current/next.json")
      .then((res) => res.json())
      .then((data) => {
        setResultat(data.MRData.RaceTable.Races[0]);
      })
      .catch((error) => (
        console.error("Error fetching data:", error),
        toast.error(`Aucune image trouvée pour ${error}`)
      ));
  }, []);

  if (!resultat) {
    return (
      <div className="flex flex-row justify-between items-center m-5 bg-neutral-content p-3 rounded -translate-y-14 drop-shadow-2xl">
        <div>
          <h1 className="text-xl font-medium">Prochaine course</h1>
          <p className="text-sm opacity-70">Informations de la course</p>
        </div>
        <div></div>
        <div className="flex gap-5 flex-row">
          <div>
            <p className="text-sm opacity-70">Circuit</p>
            <p className="text-sm">Aucune information</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Ville</p>
            <p className="text-sm">Aucune information</p>
          </div>
          <div>
            {" "}
            <p className="text-sm opacity-70">Date</p>
            <p className="text-sm">Aucune information</p>
          </div>
        </div>
      </div>)
  }
  if (resultat.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-between items-center m-5 bg-neutral-content p-3 rounded -translate-y-14 drop-shadow-2xl">
      <div>
        <h1 className="text-xl font-medium">Prochaine course</h1>
        <p className="text-sm opacity-70">Informations de la course</p>
      </div>
      <div></div>
      <div className="flex gap-5 flex-row">
        <div>
          <p className="text-sm opacity-70">Circuit</p>
          <p className="text-sm">{resultat.Circuit.circuitName}</p>
        </div>
        <div>
          <p className="text-sm opacity-70">Ville</p>
          <p className="text-sm">{resultat.Circuit.Location.country}</p>
        </div>
        <div>
          {" "}
          <p className="text-sm opacity-70">Date</p>
          <p className="text-sm">{resultat.date}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchHome;
