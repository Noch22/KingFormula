import React, { useState, useEffect } from "react";
import Header from "../components/header";
import FetchResults from "../fetching/FetchResults";

export default function nom() {
  return (
    <>
      <Header active="results" />
      <main>
        <div className="flex justify-center w-full">
          <FetchResults />
        </div>
      </main>
    </>
  );
}
