import { useRef } from 'react';
import './MarqueeTicker.css';

const TICKER_ITEMS = [
    'React', '—', 'Angular', '—', 'TypeScript', '—', 'ASP.NET', '—', 
    'UI/UX', '—', 'Three.js', '—', 'GSAP', '—', 'WordPress', '—',
    'Ionic', '—', 'Sass', '—', 'SQL', '—', 'Bootstrap', '—',
];

export const MarqueeTicker = () => {
    const tickerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Removed the scroll-velocity style.animationDuration hack
    // as it recalculates layout on every tick and causes massive lag.
    // Pure CSS animation is hardware accelerated and ultra-smooth.

    // Triple the items for seamless infinite loop
    const repeatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

    return (
        <div className="marquee-ticker" ref={tickerRef}>
            <div className="marquee-track" ref={trackRef}>
                {repeatedItems.map((item, i) => (
                    <span key={i} className={`marquee-item ${item === '—' ? 'marquee-separator' : ''}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};
