import React from "react";
import Header from "../components/header";
import Fetchqualifs from "../fetching/FetchQualif";

export default function last() {
  return (
    <>
      <Header active="lastqualif" />
      <main className="flex justify-center m-2  mt-4">
        <Fetchqualifs />
      </main>
    </>
  );
}
