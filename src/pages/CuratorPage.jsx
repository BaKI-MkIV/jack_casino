import React from "react";
import TabsContainer from "../elements/TabsContainer/TabsContainer";

export default function CuratorPage() {

    const tabs = [
        "/jsons/tabs/plot.json",
        "/jsons/tabs/npcs.json",
        "/jsons/tabs/homerules.json",
    ];

    return (
        <div className="page-container">
            <h1>Кураторы</h1>
            <TabsContainer tabPaths={tabs} />
        </div>
    );
}