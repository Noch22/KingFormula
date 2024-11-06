import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Nom from "./pages/results";
import Last from "./pages/last";
import Lastqualif from "./pages/lastqualifs";
import Construct from "./pages/construct";
import Pit from "./pages/pit";
import Search from "./pages/search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Nom />} />
          <Route path="/last" element={<Last />} />
          <Route path="/lastqualif" element={<Lastqualif />} />
          <Route path="/constructeurs" element={<Construct />} />
          <Route path="/pitstops" element={<Pit />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
