import React, { useEffect, useState } from "react";
import JsonRenderer from "./JsonRenderer";

export default function JsonPage({ src }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(src)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Ошибка загрузки JSON:", err));
    }, [src]);

    if (!data) return <p>Загрузка...</p>;

    return <JsonRenderer data={data} />;
}
