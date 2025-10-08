import React from "react";
import styles from "./MainPreviewPage.module.css";

export default function MainPreviewPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 >Дом, который построил</h2>
                <h1 >Джек</h1>
            </div>
            <video
                className={styles.video}
                src="/mainSlot.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
            />

            <h3 className={styles.footerText}>Нажмите любую клавишу...</h3>

        </div>
    );
}
