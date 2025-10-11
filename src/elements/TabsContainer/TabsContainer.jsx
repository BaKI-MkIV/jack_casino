import React, { useState, useEffect, forwardRef } from "react";
import JsonRenderer from "../JsonElem/JsonRenderer";
import SubTabsContainer from "../SubTabsContainer/SubTabsContainer";
import styles from "./TabsContainer.module.css";

const TabsContainer = forwardRef(({ tabPaths, subTabsExist = true }, ref) => {
    const [activeTab, setActiveTab] = useState(0);
    const [tabData, setTabData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!tabPaths || tabPaths.length === 0) return;

        // Если один файл, загружаем как массив с одним элементом
        const paths = Array.isArray(tabPaths) ? tabPaths : [tabPaths];

        Promise.all(
            paths.map((path) =>
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
        ).then((data) => setTabData(data.filter(Boolean)))
            .catch((err) => setError(err.message));
    }, [tabPaths]);

    const loadedTabs = tabData;

    if (error) return <p className={styles.error}>Ошибка: {error}</p>;
    if (!loadedTabs || loadedTabs.length === 0) return <p className={styles.loading}>Загрузка...</p>;

    // Определяем, показывать ли SubTabsContainer
    const showSubTabs = subTabsExist && loadedTabs[activeTab];

    // Если только один файл, скрываем верхние вкладки, чтобы вести себя как LilTabsContainer
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
