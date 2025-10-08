import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainPreviewPage from "./pages/MainPreviewPage";
import MainPage from "./pages/MainPage";
import "./App.css";

export default function App() {
    const containerRef = useRef(null);
    const [showPreview, setShowPreview] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleExitPreview = () => {
        setIsFading(true); // запускаем анимацию fade-out
    };

    // Ставим фокус на контейнер, чтобы ловить клавиши
    useEffect(() => {
        if (showPreview && containerRef.current) {
            containerRef.current.focus();
        }
    }, [showPreview]);

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={showPreview ? handleExitPreview : undefined}
            onClick={showPreview ? handleExitPreview : undefined}
            style={{ outline: "none" }}
            className={isFading ? "fade-out" : "fade-in"}
            onAnimationEnd={() => {
                if (isFading) {
                    setShowPreview(false);
                    setIsFading(false); // сбрасываем для fade-in следующей страницы
                }
            }}
        >
            {showPreview ? (
                <MainPreviewPage />
            ) : (
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<div>Страница не найдена</div>} />
                </Routes>
            )}
        </div>
    );
}
