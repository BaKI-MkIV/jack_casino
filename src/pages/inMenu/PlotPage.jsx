import React from "react";
import PageLayout from "./PageLayout";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";
import "../../App.css";

export default function PlotPage() {
    return (
        <PageLayout title="Сюжет">
            <TabsContainer tabPaths="/jsons/tabs/plot.json" subTabsExist={true} />
            <h5 className="notEnd">
                Эта история все еще пишется...
            </h5>
        </PageLayout>
    );
}