import React from "react";
import Header from "./elements/Header/Header";
import MainBanner from "./elements/Main-banner/Main-banner";
import TabsContainer from "./elements/TabsContainer/TabsContainer";
import "./App.css";


import tab1 from "./tabs/plot.json";
import tab2 from "./tabs/npcs.json";
import tab3 from "./tabs/homerules.json";

export default function App() {

    const tabs = [tab1, tab2, tab3];

    return (
        <div>
            <Header />
            <MainBanner />
            <TabsContainer tabs={tabs} />
        </div>
    );
}
