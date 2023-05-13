import React, { useState } from "react";
import styles from "./styles.module.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`Name: , Password: ${password}, Confirm Password:`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_wrapper}>
      <p className={styles.form_heading}>Login</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        className={styles.input_element}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className={styles.input_element}
      />
      <button type="submit" className={styles.form_button}>
        Login
      </button>
      <p className={styles.account_tag}>
        Don’t have an account?
        <span className={styles.auth_action_tag}>Signup</span>
      </p>
    </form>
  );
}

export default Login;
