import React from "react";
import Headerbutton from "./Headerbutton";

export default function header(props) {
  return (
    <header className="w-full flex items-center space-x-8 justify-center p-1 sticky top-0 bg-base-100 z-10">
      <div>
        <h1 className="text-4xl w-full justify-center flex">KingFormula</h1>
      </div>
      <div>
        <nav>
          <ul className="flex justify-center">
            <li className="p-2">
              <Headerbutton
                nom="Accueil"
                lien="/"
                active={`${props.active === "home" ? "active" : ""}`}
              />
            </li>
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
              <Headerbutton
                nom="Saisons"
                lien=""
                active={`${props.active === "nutrition" ? "active" : ""}`}
              />
            </li>
            <li className="p-2">
              <details className="dropdown">
                <summary className="btn btn-ghost m-1">Qualifications</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <Headerbutton
                      nom="Résultats de qualifications"
                      lien=""
                      active={`${props.active === "famille" ? "active" : ""}`}
                    />
                  </li>
                  <li className="text-left">
                    <Headerbutton
                      nom="Résultats de qualifications"
                      lien=""
                      active={`${props.active === "famille" ? "active" : ""}`}
                    />
                  </li>
                </ul>
              </details>
            </li>
            <li className="p-2">
              <Headerbutton
                nom="Par genre"
                lien=""
                active={`${props.active === "genre" ? "active" : ""}`}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
