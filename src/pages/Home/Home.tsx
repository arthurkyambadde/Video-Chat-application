import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import settingsIcon from "../../assets/settings.png";

function Home() {
  return (
    <nav className={styles.home_container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.details}>
        <span>About Us</span>
        <span>Help</span>
        <span>Feedback</span>
        <img
          src={settingsIcon}
          alt="settings icon"
          className={styles.settings}
        />
      </div>
    </nav>
  );
}

export default Home;
