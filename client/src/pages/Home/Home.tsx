import React, { useState } from "react";
import styles from "./styles.module.css";
import Signup from "../../components/authentication/Signup/Signup";
import Login from "../../components/authentication/Login/Login";
import Nav from "../../components/nav/Nav";

function Home() {
  const [auth, setAuth] = useState(false);

  return (
    <div className={styles.home_Wrapper}>
      <Nav />
      <div className={styles.registration_form}>
        {auth ? <Signup setAuth={setAuth} /> : <Login setAuth={setAuth} />}
      </div>
    </div>
  );
}

export default Home;
