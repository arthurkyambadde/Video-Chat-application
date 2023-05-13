import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import settingsIcon from "../../assets/settings.png";
import Signup from "../../components/authentication/Signup/Signup";
import Login from "../../components/authentication/Login/Login";

function Home() {
  return (
    <div className={styles.home_Wrapper}>
      <nav className={styles.nav_container}>
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
      <div className={styles.registration_form}>
        <Login />
      </div>
    </div>
  );
}

export default Home;
