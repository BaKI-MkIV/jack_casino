import React from "react";
import PageLayout from "./PageLayout";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";

const tabs = [
    "/jsons/homebrews/damages_update.json",
];

export default function HomebrewPage() {
    return (
        <PageLayout title="Домашние правила">
            <TabsContainer tabPaths={tabs} subTabsExist={false}/>
        </PageLayout>
    );
}