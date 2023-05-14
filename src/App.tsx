import React from "react";
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import styles from "./app.module.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={OnBoarding} />
        <Route path="/home" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
