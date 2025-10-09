import React from "react";
import PageLayout from "./PageLayout";
import JsonRenderer from "../../elements/JsonElem/JsonRenderer";
import TabsContainer from "../../elements/TabsContainer/TabsContainer";
import LilTabsContainer from "../../elements/TabsContainer/LilTabsContainer";

export default function PlotPage() {
    return (
        <PageLayout title="Сюжет">
            <LilTabsContainer src="/jsons/tabs/plot.json" />
        </PageLayout>
    );
}