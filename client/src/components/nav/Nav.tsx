import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import settingsIcon from "../../assets/settings.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className={styles.nav_container}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
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

export default Nav;
