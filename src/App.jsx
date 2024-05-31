import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Deals from "./pages/deals/deals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </Router>
  );
}

export default App;
