import React from "react";
import PageLayout from "./PageLayout";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";

const tabs = [
    "/jsons/npcs/curators/morgan.json",
    "/jsons/npcs/curators/kenneret.json",
    "/jsons/npcs/curators/riz.json",
];

export default function NPCPage() {
    return (
        <PageLayout title="Неигровые персонажи">
            <TabsContainer tabPaths={tabs} subTabsExist={false}/>
        </PageLayout>
    );
}