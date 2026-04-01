import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { HeroGraphic } from './HeroGraphic';
import './Hero.css';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Masked title reveal
            tl.fromTo('.hero-title-mask-inner', 
                { yPercent: 120, rotateZ: 5 }, 
                { yPercent: 0, rotateZ: 0, duration: 1.6, stagger: 0.15 },
                0.5
            )
            // Fade in and float the graphic cards
            .fromTo('.floating-graphic',
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 2, stagger: 0.2, ease: 'power3.out' },
                1.0
            )
            // Fade in meta details
            .fromTo('.hero-fade-in',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1 },
                '-=1.2'
            )
            // Ambient glow scale
            .fromTo('.hero-ambient-glow',
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' },
                0
            );

            // Brutalist parallax binding
            const handleMouseMove = (e: MouseEvent) => {
                const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
                const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
                gsap.to('.hero-title-mask-inner', { x: xPos, y: yPos, duration: 1, ease: 'power3.out' });
                // Subtle reverse parallax for floating cards
                gsap.to('.floating-graphic', { x: -xPos * 1.5, y: -yPos * 1.5, duration: 1.5, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section blur-backdrop" ref={containerRef}>
            <HeroGraphic />
            
            <div className="hero-content" style={{ zIndex: 10, position: 'relative' }}>
                <div className="hero-titles">
                    <div className="hero-title-mask">
                        <h1 className="hero-title-mask-inner">VAIBHAV</h1>
                    </div>
                    <div className="hero-title-mask accent-mask">
                        <h1 className="hero-title-mask-inner accent">GAURAHA<span className="dot">.</span></h1>
                    </div>
                </div>

                <div className="hero-meta-grid">
                    <div className="hero-fade-in brutal-block">
                        <span className="brutal-label">ROLE /</span>
                        <p className="brutal-value">SENIOR PROGRAMMER<br/>& UI/UX ARCHITECT</p>
                    </div>
                    
                    <div className="hero-fade-in brutal-block">
                        <span className="brutal-label">LOC /</span>
                        <p className="brutal-value">CHHATTISGARH,<br/>INDIA</p>
                    </div>

                    <a href="#projects" className="hero-fade-in brutal-cta hover-target">
                        <span className="cta-circle">
                            <ArrowDownRight strokeWidth={1} size={32} />
                        </span>
                        <span className="cta-text">DISCOVER WORK</span>
                    </a>
                </div>
            </div>

            <div className="hero-scroll-indicator hero-fade-in">
                <div className="scroll-line-container">
                    <div className="scroll-line-moving"></div>
                </div>
                <span>SCROLL</span>
            </div>
            
            <div className="hero-ambient-glow"></div>
        </section>
    );
};
