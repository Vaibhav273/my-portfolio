import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [counter, setCounter] = useState(0);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const done = useRef(false);

    useEffect(() => {
        // Animate counter from 0 to 100
        const obj = { val: 0 };
        gsap.to(obj, {
            val: 100,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                setCounter(Math.round(obj.val));
            },
            onComplete: () => {
                if (done.current) return;
                done.current = true;
                // Reveal animation
                const tl = gsap.timeline({ onComplete });
                tl.to('.preloader-counter', {
                    y: -40,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                })
                    .to('.preloader-bar-fill', {
                        scaleX: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    }, '-=0.3')
                    .to('.preloader', {
                        yPercent: -100,
                        duration: 0.8,
                        ease: 'power4.inOut',
                    })
                    .set('.preloader', { display: 'none' });
            }
        });
    }, [onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-inner">
                <span className="preloader-counter" ref={counterRef}>
                    {String(counter).padStart(2, '0')}%
                </span>
                <div className="preloader-bar">
                    <div className="preloader-bar-fill" style={{ transform: `scaleX(${counter / 100})` }}></div>
                </div>
            </div>
        </div>
    );
};
