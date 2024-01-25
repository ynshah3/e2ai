import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import CNN from "./pages/cnn"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cnn" element={<CNN />} />
      </Routes>
    </div>
  );
}

export default App;
