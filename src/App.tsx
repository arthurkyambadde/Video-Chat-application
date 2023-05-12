import React from "react";
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import styles from "./app.module.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className={styles.application}>
      <Home />
    </div>
  );
}

export default App;
