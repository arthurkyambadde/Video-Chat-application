import React, { useState } from "react";
import GoogleIcon from "../../icons/Google";
import styles from "./styles.module.css";

type LoginProps = {
  setAuth: (value: boolean) => void;
};

function Login(props: LoginProps) {
  const { setAuth } = props;

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
        <span className={styles.auth_action_tag} onClick={() => setAuth(true)}>
          Signup
        </span>
      </p>
      <div className={styles.auth_type__border_line}>
        <div className={styles.line}></div>
        <span>Or</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.signin_With__google_container}>
        <GoogleIcon />
        <p>Login with Google</p>
      </div>
    </form>
  );
}

export default Login;
