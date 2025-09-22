import React from "react";
import styles from "./JsonRenderer.module.css";

export default function JsonRenderer({ data }) {
    if (!data) return null;

    const content = Array.isArray(data.content) ? data.content : [];

    // Рекурсивный рендер блоков
    const renderBlocks = (blocks) => {
        return blocks.map((block, index) => {
            // Subtitle
            if (block.subtitle) {
                return (
                    <h3 key={index} className={styles.subtitle}>
                        {block.subtitle}
                    </h3>
                );
            }

            // Quote
            if (block.quote) {
                const quote = block.quote;
                return (
                    <blockquote key={index} className={styles.quote}>
                        <p>{quote.content}</p>
                        <footer>- {quote.author || "Неизвестно"}</footer>
                    </blockquote>
                );
            }

            // Text
            if (block.text) {
                return <p key={index}>{block.text}</p>;
            }

            // Tips
            if (block.tips) {
                const tips = block.tips;
                return (
                    <div key={index} className={styles.tips}>
                        {typeof tips === "string" ? (
                            <p>{tips}</p>
                        ) : (
                            <>
                                {tips.title && <h4>{tips.title}</h4>}
                                {Array.isArray(tips.content) ? (
                                    renderBlocks(tips.content) // вложенные блоки
                                ) : (
                                    <p>{tips.content}</p>
                                )}
                            </>
                        )}
                    </div>
                );
            }

            // Comment
            if (block.comment) {
                const comment = block.comment;
                return (
                    <div key={index} className={styles.comment}>
                        {typeof comment === "string" ? (
                            <p>{comment}</p>
                        ) : (
                            <>
                                {comment.title && <h4>{comment.title}</h4>}
                                {Array.isArray(comment.content) ? (
                                    renderBlocks(comment.content) // вложенные блоки
                                ) : (
                                    <p>{comment.content}</p>
                                )}
                            </>
                        )}
                    </div>
                );
            }

            // Image
            if (block.image) {
                const image = block.image;
                return (
                    <div key={index} className={styles.imageBlock}>
                        {typeof image === "string" ? (
                            <img src={image} alt="" />
                        ) : (
                            <>
                                <img src={image.path} alt="" />
                                {image.comment && (
                                    <p className={styles.imageComment}>{image.comment}</p>
                                )}
                            </>
                        )}
                    </div>
                );
            }

            // Link
            if (block.link) {
                const link = block.link;
                return (
                    <a
                        key={index}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        {link.wrap || link.path}
                    </a>
                );
            }

            return null;
        });
    };

    return (
        <div>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.content}>{renderBlocks(content)}</div>
        </div>
    );
}
