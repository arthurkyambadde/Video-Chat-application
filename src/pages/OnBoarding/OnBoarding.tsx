import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import avatar from "../../assets/avatar.jpg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function OnBoarding() {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setDateString(`${time}  ${date}`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.onboarding_container}>
      <nav className={styles.navigation_wrapper}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.details}>
          <span>{dateString}</span>
          <img src={avatar} alt="" className={styles.user_avatar} />
          <Link to="/home">Try</Link>
        </div>
      </nav>
    </div>
  );
}

export default OnBoarding;
