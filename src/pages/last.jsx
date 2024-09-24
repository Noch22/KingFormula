import React from "react";
import Header from "../components/header";
import FetchLast from "../fetching/FetchLast";

export default function last() {
  return (
    <>
      <Header active="last" />
      <main className="flex justify-center m-2  mt-4">
        <FetchLast />
      </main>
    </>
  );
}
