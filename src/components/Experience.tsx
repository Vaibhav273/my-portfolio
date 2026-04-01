import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: '23-PR',
        role: 'SENIOR PROGRAMMER (L6)',
        company: 'NIC CHHATTISGARH',
        details: [
            'Architected E-MANEC, optimizing non-executive cadre management for the state.',
            'Redesigned Shabari Emporium web portal, boosting tribal handicraft reach.',
            'Led migration of heritage ASP.NET systems to scalable React Architectures.'
        ]
    },
    {
        year: '19-23',
        role: 'PROGRAMMER (L5)',
        company: 'NIC CHHATTISGARH',
        details: [
            'Developed Chief Minister Relief Fund (CMRF) portal handling high-volume queries.',
            'Implemented custom Redux dashboards for internal Website Management Systems.',
            'Maintained dual-stack expertise running C#/ASP.NET alongside modern JS frameworks.'
        ]
    },
    {
        year: '17-19',
        role: 'SOFTWARE ENGINEER',
        company: 'PRIVATE ENTERPRISE',
        details: [
            'Built claim adjustment platforms processing thousands of global insurance claims.',
            'Engineered cross-platform service booking apps using Ionic and React Native.'
        ]
    }
];

export const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background Effect
            gsap.to(bgRef.current, {
                yPercent: 30, // Moves the background downwards slowly as you scroll
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Card Reveal Sequence
            cardsRef.current.forEach((card) => {
                if (!card) return;
                gsap.fromTo(card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="parallax-experience-section" ref={sectionRef}>
            {/* Smooth UI Parallax Mesh Background */}
            <div className="parallax-bg-pattern" ref={bgRef}></div>

            <div className="parallax-experience-header">
                <h2>
                    <span className="outline-text">PROFESSIONAL</span>
                    JOURNEY
                </h2>
            </div>

            <div className="editorial-timeline">
                {experiences.map((exp, index) => (
                    <div 
                        key={index} 
                        className="editorial-card hover-target" 
                        ref={el => { cardsRef.current[index] = el; }}
                    >
                        <div className="editorial-visual">
                            {/* Trending morphing gradient orb */}
                            <div className="trending-graphic-shape"></div>
                        </div>
                        <div className="editorial-content">
                            <h3 className="editorial-year">{exp.year}</h3>
                            <h4 className="editorial-role">{exp.role}</h4>
                            <span className="editorial-company">{exp.company}</span>
                            
                            <ul className="editorial-details">
                                {exp.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
