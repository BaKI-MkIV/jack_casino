// PageHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";

export default function PageHeader({ title }) {
    return (
        <div className={styles.headerContainer}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.backButton}>
                <Link to="/" className={styles.link}>
                    На главную
                </Link>
            </h3>
        </div>
    );
}
