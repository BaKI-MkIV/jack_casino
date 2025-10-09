import React, { useState, useEffect, forwardRef } from "react";
import JsonRenderer from "../JsonElem/JsonRenderer";
import SubTabsContainer from "../SubTabsContainer/SubTabsContainer";
import styles from "./TabsContainer.module.css";

const LilTabsContainer = forwardRef(({ src }, ref) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(src)
            .then((res) => {
                if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    }, [src]);

    if (error) return <p className={styles.error}>Ошибка: {error}</p>;
    if (!data) return <p className={styles.loading}>Загрузка...</p>;

    return (
        <div ref={ref} className={styles.container}>
            <SubTabsContainer data={data} />
            <div className={styles.content}>
                <JsonRenderer data={data} />
            </div>
        </div>
    );
});

export default LilTabsContainer;
