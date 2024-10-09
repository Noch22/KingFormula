import React from "react";
import Header from "../components/header";
import Fetchconstruct from "../fetching/FetchConstruct";

export default function Construct() {
  return (
    <>
      <Header active="constructeurs" />
      <main className="flex justify-center m-2  mt-4">
        <Fetchconstruct />
      </main>
    </>
  );
}
