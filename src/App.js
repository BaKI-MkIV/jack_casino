import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./elements/Header/Header";
import MainBanner from "./elements/Main-banner/Main-banner";
import TabsContainer from "./elements/TabsContainer/TabsContainer";
import CuratorPage from "./pages/CuratorPage";

import "./App.css";

const tabs = [
    "/jsons/tabs/plot.json",
    "/jsons/tabs/npcs.json",
    "/jsons/tabs/homerules.json",
];

export default function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={(
                    <>
                        <MainBanner />
                        <TabsContainer tabPaths={tabs} />
                    </>
                )} />
                <Route path="/curators" element={<CuratorPage />} /> {/* Маршрут для кураторов */}
                <Route path="*" element={<div>Страница не найдена</div>} /> {/* 404, опционально */}
            </Routes>
        </div>
    );
}