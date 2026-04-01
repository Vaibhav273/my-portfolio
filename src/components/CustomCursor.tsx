import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);
    const isHovering = useRef(false);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot follows immediately via transform (no React re-render)
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${isHovering.current ? 0 : 1})`;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hovering = !!(
                target.tagName === 'A' || target.tagName === 'BUTTON' ||
                target.closest('a') || target.closest('button') ||
                target.classList.contains('hover-target')
            );
            isHovering.current = hovering;
            outline.style.borderColor = hovering ? 'rgba(0, 242, 255, 0.5)' : 'var(--accent-primary)';
            outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(${hovering ? 1.5 : 1})`;
        };

        // Smooth trailing for the outline ring via rAF (no React state)
        const animate = () => {
            outlineX += (mouseX - outlineX) * 0.12;
            outlineY += (mouseY - outlineY) * 0.12;
            outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(${isHovering.current ? 1.5 : 1})`;
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        const rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={outlineRef} className="cursor-outline" />
        </>
    );
};
