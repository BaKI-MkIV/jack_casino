import React from "react";
import PageLayout from "./PageLayout";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";

const tabs = [
    "/jsons/npcs/curators.json",
    "/jsons/npcs/handsome_jack.json",
];

export default function NPCPage() {
    return (
        <PageLayout title="Неигровые персонажи">
            <TabsContainer tabPaths={tabs} subTabsExist={false}/>
        </PageLayout>
    );
}