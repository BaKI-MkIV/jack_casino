import React from "react";
import Reel from "../Reel/Reel"; // путь к твоему компоненту Reel
import styles from "./Main-banner.module.css";

export default function MainBanner() {
    const tc = [
        "/slots/tc/tc_fool.png",
        "/slots/tc/tc_star.png",
        "/slots/tc/tc_talons.png",
        "/slots/tc/tc_throne.png",
        "/slots/tc/tc_void.png",
    ];

    const curators = [
        "/slots/curators/demogorgoth.png",
        "/slots/curators/kenneret.png",
        "/slots/curators/morgan.png",
        "/slots/curators/moxxie.png",
        "/slots/curators/joshua.png",
    ];

    const players = [
        "/slots/players/anya.png",
        "/slots/players/nekita.png",
        "/slots/players/gleb.png",
        "/slots/players/nekita1.png",
        "/slots/players/stepan.png",
        "/slots/players/stepan1.png",
    ];

    return (
        <div className={styles.container}>
            <Reel images={tc} duration={2.3} />
            <Reel images={curators} duration={1.5} />
            <Reel images={players} duration={2.5} />

            {/* затемнение */}
            <div className={styles.overlay}>

                <div className={styles.text}>
                    <h2>ДЖЕК МЕРТВ</h2>
                    <h2>ДЕНЬГИ - ТОПЛИВО</h2>
                    <h2>КАЗИНО ПЕРЕПОЛНЕНО</h2>
                </div>
            </div>
        </div>
    );
}
