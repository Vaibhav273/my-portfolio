import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text scrub reveal
            const lines = textRef.current?.querySelectorAll('.reveal-line');
            if (lines && lines.length > 0) {
                gsap.fromTo(
                    gsap.utils.toArray(lines),
                    { y: 60, opacity: 0, rotateX: -20 },
                    {
                        y: 0, opacity: 1, rotateX: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }

            // Floating image parallax
            gsap.to(imgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            // Global SV Pattern parallax
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="section brutal-about-section" ref={sectionRef}>
            <div className="parallax-bg-pattern-global" ref={bgRef}></div>
            <div className="brutal-about-container">
                <div className="brutal-about-content" ref={textRef}>
                    <p className="brutal-about-text">
                        <span className="reveal-line-wrapper"><span className="reveal-line">Building mission-critical</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line">government portals at the</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line accent-text">National Informatics Center.</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line">Over a decade transforming</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line">complex logic into seamless</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line">digital experiences across</span></span>
                        <span className="reveal-line-wrapper"><span className="reveal-line">React, Angular & ASP.NET.</span></span>
                    </p>
                    
                    <div className="brutal-stats-grid">
                        <div className="brutal-stat">
                            <h3>10+</h3>
                            <span>YEARS EXP</span>
                        </div>
                        <div className="brutal-stat">
                            <h3>15+</h3>
                            <span>ENTERPRISE PROJECTS</span>
                        </div>
                        <div className="brutal-stat">
                            <h3>06+</h3>
                            <span>YEARS AT NIC</span>
                        </div>
                    </div>
                </div>

                <div className="brutal-about-visual">
                    <div className="brutal-image-wrapper" ref={imgRef}>
                        <img 
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Coding structure" 
                            className="brutal-floating-image hover-target"
                        />
                        <div className="brutal-image-caption">SYSTEMS ARCHITECTURE</div>
                    </div>
                </div>
            </div>
            {/* Removed the blank space generic bottom-margin entirely via CSS */}
        </section>
    );
};
