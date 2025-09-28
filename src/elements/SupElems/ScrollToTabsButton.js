import React, { useState, useEffect } from "react";

export default function ScrollToTabsButton({ tabsRef }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const banner = document.getElementById("mainBanner");
        if (!banner) {
            console.error("MainBanner не найден. Проверьте id='mainBanner' в MainBanner.jsx");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
                console.log("MainBanner виден:", entry.isIntersecting, "Кнопка видима:", !entry.isIntersecting);
            },
            { threshold: 0, rootMargin: "0px" } // Срабатывает, когда баннер полностью выходит
        );

        observer.observe(banner);
        return () => observer.unobserve(banner);
    }, []);

    const handleScrollToTabs = () => {
        if (!tabsRef.current) {
            console.error("tabsRef не определён. Проверьте ref в TabsContainer.");
            return;
        }

        const header = document.querySelector("header");
        const headerHeight = header?.offsetHeight || 0;
        const top = tabsRef.current.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top, behavior: "smooth" });
        console.log("Прокрутка к TabsContainer, позиция:", top);
    };

    if (!isVisible) {
        console.log("Кнопка не рендерится, isVisible:", isVisible);
        return null;
    }

    return (
        <button
            style={{
                position: "fixed",
                right: "20px",
                bottom: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#f8c61e",
                color: "#000",
                fontSize: "24px",
                border: "none",
                cursor: "pointer",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={handleScrollToTabs}
            aria-label="Прокрутить к вкладкам"
        >
            ▲
        </button>
    );
}