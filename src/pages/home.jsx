import React from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import FetchHome from "../fetching/FetchHome";
import Racesingle from "../components/Racesingle";
import FetchRaces from "../fetching/FetchRaces";
import { Toaster } from "sonner";

export default function home() {
  return (
    <main>
      <Header active="home" />
      <div>

        <div className="hero bg-base-200 h-full md:mb-2 mb-20">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src="/image.jpeg" className="max-w-xs rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-king-font">KingFormula®</h1>
              <p className="py-6">
                Découvrez les derniers résultats de la Formule 1 sur
                KingFormula®. Visitez les différentes pages pour en savoir plus
                sur les pilotes, les équipes et les circuits.
              </p>
              <Link to="/last" className="btn btn-secondary">
                Voir les derniers résultats sur KingFormula®
              </Link>
            </div>
          </div>
        </div>
        <FetchHome />
      </div>
      <div className="w-full flex justify-center items-center">
        <Toaster richColors />
        <FetchRaces />
      </div>
    </main>
  );
}
