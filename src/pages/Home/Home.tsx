import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import settingsIcon from "../../assets/settings.png";

function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(
      `Name: ${name}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
  };
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
      <form onSubmit={handleSubmit} className={styles.registration_form}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
