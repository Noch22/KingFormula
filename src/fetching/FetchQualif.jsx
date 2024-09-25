import React from "react";

export default function FetchQualif() {
  return (
    <div>
      <div className="flex flex-row- justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">Les derniers résultats</h1>
          <p className="text-sm opacity-70">Informations de la course</p>
        </div>
        <div className="flex gap-5 flex-row">
          <div>
            <p className="text-sm opacity-70">Circuit</p>
            <p className="text-sm"></p>
          </div>
          <div>
            <p className="text-sm opacity-70">Ville</p>
            <p className="text-sm"></p>
          </div>
          <div>
            <p className="text-sm opacity-70">Date</p>
            <p className="text-sm"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
