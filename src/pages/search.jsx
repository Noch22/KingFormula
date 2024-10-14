import React from "react";
import Header from "../components/header";
import Fetchsearch from "../fetching/FetchSearch";

export default function Search() {
  return (
    <>
      <Header active="search" />
      <main className="w-full flex flex-col justify-center items-center">
        <h1 className="font-king-font text-4xl p-12">
          Rechercher des informations
        </h1>
        <Fetchsearch />
      </main>
    </>
  );
}
