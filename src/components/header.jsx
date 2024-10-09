import React from "react";
import Headerbutton from "./Headerbutton";

export default function header(props) {
  return (
    <header className="w-full flex items-center space-x-8 justify-center p-1 sticky top-0 bg-base-100 z-10 shadow-md">
      <div>
        <a href="/">
          <h1 className="text-4xl w-full justify-center flex font-king-font">
            KingFormula®
          </h1>
        </a>
      </div>
      <div>
        <nav>
          <ul className="flex justify-center">
            {/* <li className="p-2">
              <Headerbutton
                nom="Accueil"
                lien="/"
                active={`${props.active === "home" ? "active" : ""}`}
              />
            </li> */}
            <li className="p-2">
              <div className="indicator">
                <span className="indicator-item badge badge-primary">new</span>
                <div className="">
                  <Headerbutton
                    nom="Derniers résultats"
                    lien="/last"
                    active={`${props.active === "last" ? "active" : ""}`}
                  />
                </div>
              </div>
            </li>
            <li className="p-2">
              <details className="dropdown">
                <summary className="btn btn-ghost">Données de courses</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <Headerbutton
                      nom="🥇 Derniers résultats de qualifications"
                      lien="/lastqualif"
                      active={`${
                        props.active === "lastqualif" ? "active" : ""
                      }`}
                    />
                  </li>
                  <li className="text-center">
                    <Headerbutton
                      nom="🚥 Dernières données de PitStops"
                      lien="/pitstops"
                      active={`${props.active === "pit" ? "active" : ""}`}
                    />
                  </li>
                </ul>
              </details>
            </li>
            <li className="p-2">
              <Headerbutton
                nom="Constructeurs"
                lien="/constructeurs"
                active={`${props.active === "constructeurs" ? "active" : ""}`}
              />
            </li>
            <li className="p-2">
              <Headerbutton
                nom="Rechercher"
                lien="/search"
                active={`${props.active === "search" ? "active" : ""}`}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
