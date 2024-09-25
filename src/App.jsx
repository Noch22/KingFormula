import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Nom from "./pages/results";
import Last from "./pages/last";
import Lastqualif from "./pages/lastqualifs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Nom />} />
          <Route path="/last" element={<Last />} />
          <Route path="/lastqualif" element={<Lastqualif />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
