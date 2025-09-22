import React from "react";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.link}>
                <h2>Дом, который построил</h2>
                <h1>Джек</h1>
            </a>
        </header>
    );
}
