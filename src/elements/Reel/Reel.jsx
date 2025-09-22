import React from "react";
import { motion } from "framer-motion";
import styles from "./Reel.module.css";

export default function Reel({
                                 images,
                                 duration = 2,
                                 offset = "0%",
                             }) {
    const reelImages = [...images, ...images];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <motion.div
                    className={styles.motionDiv}
                    style={{ y: offset }}
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration, ease: "linear" }}
                >
                    {reelImages.map((src, i) => (
                        <React.Fragment key={i}>
                            <img src={src} alt="" className={styles.imgStyle} />
                            {i < reelImages.length - 1 && <div className={styles.separator} />}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
