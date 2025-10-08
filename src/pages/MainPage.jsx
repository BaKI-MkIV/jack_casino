import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";

const menuItems = [
    { label: "Сюжет", path: "/plot" },
    { label: "Неигровые персонажи", path: "/npc" },
    { label: "Справочник", path: "/handbook" },
    { label: "Домашние правила", path: "/homebrew" },
    { label: "Творчество", path: "/creation" },
];

export default function MainPage() {
    return (
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Дом, который построил</h2>
                <h1 className={styles.mainTitle}>Джек</h1>
            </div>

            <nav className={styles.menu}>
                {menuItems.map((item, idx) => (
                    <h3 key={idx} className={styles.menuItem}>
                        <Link to={item.path} className={styles.menuLink}>
                            {item.label}
                        </Link>
                        <div className={styles.underline} />
                    </h3>
                ))}
            </nav>
        </div>
    );
}
