import React, { useState, useEffect } from "react";
import JsonRenderer from "../JsonElem/JsonRenderer";
import styles from "./TabsContainer.module.css";

export default function TabsContainer({ tabPaths }) {
    const [activeTab, setActiveTab] = useState(0);
    const [tabData, setTabData] = useState([]);

    // Загружаем все JSON при старте
    useEffect(() => {
        Promise.all(
            tabPaths.map((path) =>
                fetch(path)
                    .then((res) => {
                        if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
                        return res.json();
                    })
                    .catch((err) => {
                        console.error(err);
                        return null;
                    })
            )
        ).then((data) => setTabData(data.filter(Boolean))); // убираем null
    }, [tabPaths]);

    const loadedTabs = tabData;

    return (
        <div className={styles.container}>
            {/* Вкладки */}
            <div className={styles.tabs}>
                {loadedTabs.map((tab, index) => (
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
                {loadedTabs[activeTab] ? (
                    <JsonRenderer data={loadedTabs[activeTab]} />
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
}
