
import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPreviewPage from "./pages/MainPreviewPage";
import MainPage from "./pages/MainPage";
import PlotPage from "./pages/inMenu/PlotPage";
import "./App.css";
import NPCPage from "./pages/inMenu/NPCPage";
import HandbookPage from "./pages/inMenu/HandbookPage";
import HomebrewPage from "./pages/inMenu/HomebrewPage";
import CreationPage from "./pages/inMenu/CreationPage";

export default function App() {
    const containerRef = useRef(null);
    const location = useLocation();
    const [showPreview, setShowPreview] = useState(() => {
        if (location.pathname === "/") {
            sessionStorage.setItem("hasSeenPreview", "false");
        }
        const hasSeenPreview = sessionStorage.getItem("hasSeenPreview") === "true";
        const isMainPage = location.pathname === "/";
        return isMainPage && !hasSeenPreview;
    });
    const [isFading, setIsFading] = useState(false);
    const [currentPath, setCurrentPath] = useState(location.pathname);

    // Отслеживаем смену маршрута
    useEffect(() => {
        if (location.pathname !== currentPath && !showPreview) {
            setIsFading(true); // Запускаем затухание при смене маршрута
        }
    }, [location.pathname, currentPath, showPreview]);

    // Ставим фокус на контейнер для MainPreviewPage
    useEffect(() => {
        if (showPreview && containerRef.current) {
            containerRef.current.focus();
        }
    }, [showPreview]);

    const handleExitPreview = () => {
        setIsFading(true);
        sessionStorage.setItem("hasSeenPreview", "true");
    };

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
                    setCurrentPath(location.pathname); // Обновляем путь после затухания
                    setShowPreview(location.pathname === "/" && sessionStorage.getItem("hasSeenPreview") !== "true");
                    setIsFading(false); // Переключаем на fade-in
                }
            }}
        >
            {showPreview ? (
                <MainPreviewPage />
            ) : (
                <Routes location={currentPath}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/plot" element={<PlotPage />} />
                    <Route path="/npc" element={<NPCPage />} />
                    <Route path="/handbook" element={<HandbookPage />} />
                    <Route path="/homebrew" element={<HomebrewPage />} />
                    <Route path="/creation" element={<CreationPage />} />

                    <Route path="*" element={<div>Страница не найдена</div>} />
                </Routes>
            )}
        </div>
    );
}