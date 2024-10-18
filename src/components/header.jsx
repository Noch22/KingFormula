import React, { useState } from "react";
import Headerbutton from "./Headerbutton";

export default function Header(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="w-full flex items-center justify-center p-1 sticky top-0 bg-base-100 z-10 shadow-md">
      {/* Logo */}
      <div>
        <a href="/">
          <h1 className="text-4xl flex justify-center font-king-font">
            KingFormula®
          </h1>
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex space-x-8">
        <ul className="flex justify-center space-x-4">
          <li className="p-2">
            <div className="indicator">
              <span className="indicator-item badge badge-primary">new</span>
              <Headerbutton
                nom="Derniers résultats"
                lien="/last"
                active={`${props.active === "last" ? "active" : ""}`}
              />
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
                    active={`${props.active === "lastqualif" ? "active" : ""}`}
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

      {/* Mobile Menu (Burger Icon) */}
      <div className="lg:hidden">
        <button className="btn btn-square" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Drawer (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform z-10 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center bg-base-100 shadow-md">
          <h2 className="text-xl">Menu</h2>
          <button className="btn btn-square btn-outline" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Headerbutton
                nom="Derniers résultats"
                lien="/last"
                active={`${props.active === "last" ? "active" : ""}`}
              />
            </li>
            <li>
              <details className="dropdown">
                <summary className="btn btn-ghost">Données de courses</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box w-full py-2 space-y-5 padding shadow">
                  <li>
                    <Headerbutton
                      nom="🥇 Derniers résultats de qualifications"
                      lien="/lastqualif"
                      active={`${
                        props.active === "lastqualif" ? "active" : ""
                      }`}
                    />
                  </li>
                  <li>
                    <Headerbutton
                      nom="🚥 Dernières données de PitStops"
                      lien="/pitstops"
                      active={`${props.active === "pit" ? "active" : ""}`}
                    />
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Headerbutton
                nom="Constructeurs"
                lien="/constructeurs"
                active={`${props.active === "constructeurs" ? "active" : ""}`}
              />
            </li>
            <li>
              <Headerbutton
                nom="Rechercher"
                lien="/search"
                active={`${props.active === "search" ? "active" : ""}`}
              />
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleDrawer}
        ></div>
      )}
    </header>
  );
}
