import React from "react";
import Header from "../components/header";
import Fetchpit from "../fetching/FetchPit";

export default function pit() {
  return (
    <>
      <Header active="pit" />
      <main className="flex justify-center m-2 mt-4">
        <Fetchpit />
      </main>
    </>
  );
}
