import React from "react";
import Header from "./elements/Header/Header";
import MainBanner from "./elements/Main-banner/Main-banner";
import TabsContainer from "./elements/TabsContainer/TabsContainer";
import JsonPage from "./elements/JsonElem/JsonPage";

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
            <MainBanner />
            <TabsContainer tabPaths={tabs} />
            {/*<JsonPage src="/jsons/npcs/test.json" />*/}
        </div>
    );
}
