import React from "react";
import TabsContainer from "../elements/TabsContainer/TabsContainer";

export default function CuratorPage() {

    const tabs = [
        "/jsons/npcs/curators/morgan.json",
        "/jsons/npcs/curators/kenneret.json",
        "/jsons/npcs/curators/riz.json",
    ];

    return (
        <div className="page-container">
            <h1>Кураторы</h1>
            <TabsContainer tabPaths={tabs} />
        </div>
    );
}