import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Strength.css';

gsap.registerPlugin(ScrollTrigger);

// Including icon URLs to simulate the logos. 
const techLogos = [
    { name: "REACT", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TYPESCRIPT", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "NEXTJS", color: "#FFFFFF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "NODE", color: "#339933", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "GSAP", color: "#88CE02", icon: "https://greensock.com/smilies/gsap-favicon.png" }, /* Fallback to text if missing */
    { name: "FRAMER", color: "#FF00A0", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
    { name: "ANGULAR", color: "#DD0031", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "ASP.NET", color: "#512BD4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
    { name: "FIGMA", color: "#F24E1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

export const Strength = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const logosRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const bgRef = useRef<HTMLDivElement>(null);
    
    // For cursor-tracked logo reveal
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const cursorImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(logosRef.current,
                { y: 100, opacity: 0, rotateZ: 5 },
                {
                    y: 0, opacity: 1, rotateZ: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

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

            // Setup quickTo for buttery smooth cursor tracking
            const xTo = gsap.quickTo(cursorImageRef.current, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(cursorImageRef.current, "y", { duration: 0.4, ease: "power3" });

            const handleGlobalMove = (e: MouseEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener('mousemove', handleGlobalMove);
            return () => window.removeEventListener('mousemove', handleGlobalMove);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate the image container popping in/out
    useEffect(() => {
        if (hoveredTech) {
            gsap.to(cursorImageRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)", rotationZ: 0 });
        } else {
            gsap.to(cursorImageRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", rotationZ: -15 });
        }
    }, [hoveredTech]);

    return (
        <section id="strength" className="typographic-strength-section" ref={sectionRef}>
            <div className="parallax-bg-pattern-global" ref={bgRef}></div>
            <div className="typographic-strength-header">
                <h2>TECHNICAL MASTERY</h2>
                <span className="strength-subtitle">THE ARSENAL</span>
            </div>

            <div className="text-logos-masonry">
                {techLogos.map((tech, i) => (
                    <h3 
                        key={i} 
                        className="text-logo hover-target" 
                        ref={el => { logosRef.current[i] = el; }}
                        style={{ '--logo-color': tech.color } as any}
                        onMouseEnter={() => setHoveredTech(tech.icon)}
                        onMouseLeave={() => setHoveredTech(null)}
                    >
                        {tech.name}
                    </h3>
                ))}
            </div>
            
            <div className="typographic-strength-glow"></div>

            {/* Float-tracking Logo Image */}
            <div className="tracking-logo-container" ref={cursorImageRef}>
                {hoveredTech && <img src={hoveredTech} alt="Technology Logo" />}
            </div>
        </section>
    );
};
