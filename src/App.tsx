import React from "react";
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.application}>
      <OnBoarding />
    </div>
  );
}

export default App;
