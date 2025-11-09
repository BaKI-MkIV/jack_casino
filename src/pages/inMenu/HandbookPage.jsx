import React from "react";
import PageLayout from "./PageLayout";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";


const tabs = [
    "/jsons/handbook/omens.json",
    "/jsons/handbook/magomachines.json",
];


export default function HandbookPage() {
    return (
        <PageLayout title="Справочник">
            <TabsContainer tabPaths={tabs} subTabsExist={false}/>
        </PageLayout>
    );
}