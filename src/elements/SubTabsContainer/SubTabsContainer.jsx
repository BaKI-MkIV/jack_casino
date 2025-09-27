import React, { useEffect, useState } from "react";
import styles from "./SubTabsContainer.module.css";
import { slugify } from "../SupFunc"; // функция для генерации id из названия

export default function SubTabsContainer({ data }) {
    const [subtitles, setSubtitles] = useState([]);

    useEffect(() => {
        if (!data || !Array.isArray(data.content)) return;

        const found = data.content
            .map((block, index) => {
                if (block.subtitle) {
                    const id = block.id || slugify(block.subtitle) || `subtitle-${index}`;
                    return { id, title: block.subtitle };
                }
                return null;
            })
            .filter(Boolean);

        setSubtitles(found);
    }, [data]);

    if (subtitles.length === 0) return null;

    const handleClick = (id) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className={styles.subtabs}>
            {subtitles.map((s, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(s.id)}
                >
                    {s.title}
                </button>
            ))}
        </div>
    );
}
