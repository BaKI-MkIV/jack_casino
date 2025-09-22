import React, { useState } from "react";
import styles from "./TabsContainer.module.css";

export default function TabsContainer({ tabs }) {
    const [activeTab, setActiveTab] = useState(0); // индекс активной вкладки

    return (
        <div className={styles.container}>
            {/* Вкладки */}
            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === index ? styles.active : ""}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Контент */}
            <div className={styles.content}>
                {tabs[activeTab] && <div>{tabs[activeTab].content}</div>}
            </div>
        </div>
    );
}
