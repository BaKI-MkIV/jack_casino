import React from "react";
import styles from "./JsonRenderer.module.css";
import { slugify } from "../SupFunc";
import TabsContainer from "../TabsContainer/TabsContainer";

export default function JsonRenderer({ data }) {
    if (!data) return null;

    const content = Array.isArray(data.content) ? data.content : [];

    const renderSubtitle = (block, index) => {
        const anchorId = block.id || slugify(block.subtitle) || `subtitle-${index}`;
        return (
            <h3 id={anchorId} key={index} className={styles.subtitle}>
                {block.subtitle}
            </h3>
        );
    };

    const renderSubSubtitle = (block, index) => (
        <h4 key={index} className={styles.subsubtitle}>
            {block.subsubtitle}
        </h4>
    );

    // const renderQuote = (block, index) => (
    //     <blockquote key={index} className={styles.quote}>
    //         <p>{block.quote.content}</p>
    //         <footer>- {block.quote.author || "Неизвестно"}</footer>
    //     </blockquote>
    // );

    const renderQuote = (block, index) => {
        const quote = block.quote;
        return (
            <blockquote key={index} className={styles.quote}>
                {Array.isArray(quote.content)
                    ? renderBlocks(quote.content)
                    : <p>{quote.content}</p>}
                {quote.author && <footer>- {quote.author}</footer>}
            </blockquote>
        );
    };

    const renderText = (block, index) => <p key={index}>{block.text}</p>;

    const renderTips = (block, index) => {
        const tips = block.tips;
        return (
            <div key={index} className={styles.tips}>
                {tips.title && <h4>{tips.title}</h4>}
                {Array.isArray(tips.content)
                    ? renderBlocks(tips.content)
                    : <p>{tips.content}</p>}
            </div>
        );
    };

    const renderComment = (block, index) => {
        const comment = block.comment;
        return (
            <div key={index} className={styles.comment}>
                {comment.title && <h4>{comment.title}</h4>}
                {Array.isArray(comment.content)
                    ? renderBlocks(comment.content)
                    : <p>{comment.content}</p>}
            </div>
        );
    };

    const renderImage = (block, index) => {
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
    };

    const renderLink = (block, index) => {
        const link = block.link;
        return (
            <a
                key={index}
                href={link.path}
                rel="noopener noreferrer"
                className={styles.link}
            >
                {link.wrap || link.path}
            </a>
        );
    };

    const renderLinkOut = (block, index) => {
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
    };

    const renderTabs = (block, index) => {
        const { tabPaths, subTabsExist } = block.tabs;
        if (!Array.isArray(tabPaths)) return null;

        return (
            <div key={index} style={{ marginTop: "1em", marginBottom: "1em" }}>
                <TabsContainer tabPaths={tabPaths} subTabsExist={subTabsExist ?? true} />
            </div>
        );
    };



    // --- Регистр рендереров ---
    const renderers = {
        subtitle: renderSubtitle,
        subsubtitle: renderSubSubtitle,
        quote: renderQuote,
        text: renderText,
        tips: renderTips,
        comment: renderComment,
        image: renderImage,
        link: renderLink,
        linkOut: renderLinkOut,
        tabs: renderTabs,
    };



    // --- Главный рендер ---
    const renderBlocks = (blocks) =>
        blocks.map((block, index) => {
            // получаем ключ (например, "text" или "quote")
            const key = Object.keys(block)[0];
            const renderer = renderers[key];

            if (!renderer) {
                console.warn(`JsonRenderer: неизвестный тег "${key}"`, block);
                return null; // просто пропускаем
            }

            return renderer ? renderer(block, index) : null;
        });

    return (
        <div>
            <div className={styles.content}>{renderBlocks(content)}</div>
        </div>
    );
}
