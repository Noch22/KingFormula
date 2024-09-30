import React from "react";
import Header from "../components/header";
import Fetchsearch from "../fetching/FetchSearch";

export default function Search() {
  return (
    <>
      <Header active="search" />
      <main>
        <Fetchsearch />
      </main>
    </>
  );
}
