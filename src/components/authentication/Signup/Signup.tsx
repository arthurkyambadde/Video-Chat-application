import React, { useState } from "react";
import styles from "./styles.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(
      `Name: ${name}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_wrapper}>
      <p className={styles.form_heading}>Signu Up</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Username"
        className={styles.input_element}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        className={styles.input_element}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className={styles.input_element}
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className={styles.input_element}
      />

      <button type="submit" className={styles.form_button}>
        SignUp
      </button>
      <p className={styles.account_tag}>
        Already have an account?{" "}
        <span className={styles.auth_action_tag}>Login</span>
      </p>
    </form>
  );
}

export default Signup;
