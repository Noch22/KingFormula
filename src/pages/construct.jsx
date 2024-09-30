import React from "react";
import Header from "../components/header";
import Construction from "../components/construction";

export default function Construct() {
  return (
    <>
      <Header active="constructeurs" />
      <main>
        <Construction />
      </main>
    </>
  );
}
