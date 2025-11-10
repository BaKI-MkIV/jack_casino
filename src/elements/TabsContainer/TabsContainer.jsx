import React, { useState, useEffect, forwardRef } from "react";
import JsonRenderer from "../JsonElem/JsonRenderer";
import SubTabsContainer from "../SubTabsContainer/SubTabsContainer";
import styles from "./TabsContainer.module.css";

const API_BASE = process.env.REACT_APP_API_URL || '/api';

function buildApiUrl(path) {
    if (!path) return null;

    if (path.startsWith('http') || path.startsWith('/api')) return path;

    // Приводим путь к виду "npcs/curators"
    const clean = path
        .replace(/^\.?\/*jsons\//, '')   // убираем jsons/ или ./jsons/
        .replace(/\.json$/, '')          // убираем расширение
        .replace(/^\/+/, '');            // убираем ведущие слэши

    return `${API_BASE}/${clean}`;
}

const TabsContainer = forwardRef(({ tabPaths, subTabsExist = true }, ref) => {
    const [activeTab, setActiveTab] = useState(0);
    const [tabData, setTabData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!tabPaths || tabPaths.length === 0) return;

        const paths = Array.isArray(tabPaths) ? tabPaths : [tabPaths];

        Promise.all(
            paths.map(async (path) => {
                const url = buildApiUrl(path);
                try {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status} (${url})`);
                    return await res.json();
                } catch (err) {
                    console.error('Ошибка при загрузке:', err);
                    return null;
                }
            })
        )
            .then((data) => {
                const valid = data.filter(Boolean);
                if (valid.length === 0) setError('Не удалось загрузить данные');
                setTabData(valid);
            })
            .catch((err) => setError(err.message));
    }, [tabPaths]);

    const loadedTabs = tabData;

    if (error) return <p className={styles.error}>Ошибка: {error}</p>;
    if (!loadedTabs || loadedTabs.length === 0) return <p className={styles.loading}>Загрузка...</p>;

    const showSubTabs = subTabsExist && loadedTabs[activeTab];
    const showTopTabs = loadedTabs.length > 1;

    return (
        <div ref={ref} className={styles.container}>
            {showTopTabs && (
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
            )}

            {showSubTabs && <SubTabsContainer data={loadedTabs[activeTab]} />}

            <div className={styles.content}>
                {loadedTabs[activeTab] ? (
                    <JsonRenderer data={loadedTabs[activeTab]} />
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
});

export default TabsContainer;
