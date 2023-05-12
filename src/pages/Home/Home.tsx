import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import settingsIcon from "../../assets/settings.png";

function Home() {
  return (
    <nav className={styles.home_container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.details}>
        <a href="#" className={styles.navigation_link}>
          About Us
        </a>
        <a href="#" className={styles.navigation_link}>
          Help
        </a>
        <a href="#" className={styles.navigation_link}>
          Feedback
        </a>
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
