import React from "react";
import PageHeader from "../../elements/Headers/PageHeader";
import "./CommonPage.css"; // общий стиль контейнера

export default function PageLayout({ title, children }) {
    return (
        <div>
            <PageHeader title={title} />
            <div className="pageContainer">
                {children}
            </div>
        </div>
    );
}
