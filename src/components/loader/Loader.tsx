import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Loader() {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.spinner7}>
        <div className={styles.spinner7__double_bounce1}></div>
        <div className={styles.spinner7__double_bounce2}></div>
      </div>
    </div>
  );
}

export default Loader;
