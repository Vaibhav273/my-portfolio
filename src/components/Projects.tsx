import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'E-MANEC',
        category: 'GOVT EXCELLENCE',
        color: '#00F2FF',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
        description: 'Electronic Management of Non-Executive Cadre for Department of Commerce and Industries.',
        links: { live: 'https://emanec.cg.gov.in' }
    },
    {
        title: 'SHABARI',
        category: 'E-COMMERCE',
        color: '#7000FF',
        image: 'https://images.unsplash.com/photo-1549462111-9253457a44f2?q=80&w=2070&auto=format&fit=crop',
        description: 'Web portal for the Rural Industries Department, promoting tribal handloom and handicraft.',
        links: { live: 'https://shabari.cg.gov.in' }
    },
    {
        title: 'WMS NIC',
        category: 'MANAGEMENT',
        color: '#FF00A0',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        description: 'Website Management System for NIC, featuring a robust dashboard and real-time monitoring.',
        links: { live: 'https://services.cg.nic.in/wms/' }
    },
    {
        title: 'CG-MINES',
        category: 'GOVT DATA',
        color: '#27C93F',
        image: 'https://images.unsplash.com/photo-1579546673283-49a8c3943f6c?q=80&w=2070&auto=format&fit=crop',
        description: 'Official portal for the Chhattisgarh Mines department, managing mining resources and data.',
        links: { live: 'https://chhattisgarhmines.gov.in' }
    }
];

export const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const bgRef = useRef<HTMLDivElement>(null);

    // For custom cursor trailing link icon
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const cursorIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Apply scale reduction to cards as they get overlapped
            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                
                // We only shrink cards that are being stacked upon (not the last one)
                if (index < projects.length - 1) {
                    gsap.to(card, {
                        scale: 0.92,
                        opacity: 0.4,
                        scrollTrigger: {
                            trigger: card,
                            start: `top 15vh`, // when this card hits the sticky top
                            end: `+=${window.innerHeight * 0.8}`, // over the duration of the next card covering it
                            scrub: true,
                        }
                    });
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

            // Smooth Cursor Tracking for the link icon
            const xTo = gsap.quickTo(cursorIconRef.current, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(cursorIconRef.current, "y", { duration: 0.4, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate the custom cursor scaling in/out
    useEffect(() => {
        if (isHovering) {
            gsap.to(cursorIconRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)", rotateZ: 0 });
        } else {
            gsap.to(cursorIconRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", rotateZ: -15 });
        }
    }, [isHovering]);

    return (
        <section id="projects" className="sticky-projects-section" ref={sectionRef}>
            <div className="parallax-bg-pattern-global" ref={bgRef}></div>
            <div className="sticky-projects-header">
                <h2>SELECTED WORK</h2>
            </div>

            <div className="projects-stack-container">
                {projects.map((project, i) => (
                    <a 
                        key={i} 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="sticky-project-card hover-target"
                        style={{ '--card-color': project.color, zIndex: i } as React.CSSProperties}
                        ref={el => { cardsRef.current[i] = el; }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="project-info-side">
                            <span className="project-category-badge">{project.category}</span>
                            <div className="project-title-group">
                                <h3>{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                            </div>
                            <div className="project-link-cta">
                                EXPLORE LIVE <ArrowUpRight size={18} />
                            </div>
                        </div>
                        <div className="project-visual-side">
                            <img src={project.image} alt={project.title} />
                        </div>
                    </a>
                ))}
            </div>
            
            <div className="hero-ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4 }}></div>

            {/* Trailing Cursor Icon */}
            <div className="project-tracker-icon" ref={cursorIconRef}>
                <div className="tracker-circle">
                    <ArrowUpRight size={28} strokeWidth={1.5} color="var(--bg-color)" />
                </div>
            </div>
        </section>
    );
};
