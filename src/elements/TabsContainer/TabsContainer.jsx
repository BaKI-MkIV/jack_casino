// TabsContainer.jsx
import React, { useState, useEffect } from "react";
import JsonRenderer from "../JsonElem/JsonRenderer";
import SubTabsContainer from "../SubTabsContainer/SubTabsContainer";
import styles from "./TabsContainer.module.css";

export default function TabsContainer({ tabPaths }) {
    const [activeTab, setActiveTab] = useState(0);
    const [tabData, setTabData] = useState([]);

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
        ).then((data) => setTabData(data.filter(Boolean)));
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

            {/* Сабвкладки (по subtitle) */}
            {loadedTabs[activeTab] && (
                <SubTabsContainer data={loadedTabs[activeTab]} />
            )}

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
