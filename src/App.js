import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./elements/Header/Header";
import MainBanner from "./elements/Main-banner/Main-banner";
import TabsContainer from "./elements/TabsContainer/TabsContainer";
import CuratorPage from "./pages/CuratorPage";
import ScrollToTabsButton from "./elements/SupElems/ScrollToTabsButton";

import "./App.css";

const tabs = [
    "/jsons/tabs/plot.json",
    "/jsons/tabs/npcs.json",
    "/jsons/tabs/homerules.json",
];
export default function App() {
    const tabsRef = useRef(null); // Ref для TabsContainer

    return (
        <div>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <MainBanner id="mainBanner" /> {/* Убедимся, что id задан */}
                            <TabsContainer tabPaths={tabs} ref={tabsRef} />
                            <ScrollToTabsButton tabsRef={tabsRef} /> {/* Добавляем кнопку */}
                        </>
                    }
                />
                <Route path="/curators" element={<CuratorPage />} />
                <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
        </div>
    );
}