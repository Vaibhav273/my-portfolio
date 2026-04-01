import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Download } from 'lucide-react';
import './Socials.css';

gsap.registerPlugin(ScrollTrigger);

export const Socials = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            tl.fromTo('.bento-left',
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            )
            .fromTo('.bento-right',
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
                '-=0.8'
            )
            .fromTo('.social-icon-link',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                '-=0.4'
            )
            .fromTo('.footer-copyright',
                { opacity: 0 },
                { opacity: 0.5, duration: 1 },
                '-=0.2'
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = "mailto:gaurahavaibhav@gmail.com";
    };

    return (
        <section id="contact" className="glass-socials-section" ref={containerRef}>
            
            <div className="contact-bento-grid">
                <div className="bento-left">
                    <div className="socials-preheader">CONTACT ME</div>
                    <h2 className="socials-massive-title">
                        LET'S BUILD
                        <span>THE FUTURE.</span>
                    </h2>
                    <p className="socials-subtitle">Do you have a project in mind, or just want to say hi? Let's collaborate and build something extraordinary.</p>
                    
                    <a href="/Resume_Vaibhav_Gauraha.pdf" download className="download-resume-btn hover-target" style={{ marginTop: '2rem' }}>
                        <Download size={20} className="resume-icon" />
                        DOWNLOAD RESUME
                    </a>
                </div>

                <div className="bento-right">
                    <div className="contact-glass-card hover-target" onClick={handleEmail}>
                        <div className="contact-header">
                            <div className="contact-status">
                                <span className="status-dot"></span>
                                AVAILABLE FOR NEW OPPORTUNITIES
                            </div>
                        </div>
                        <h3 className="contact-email-large">gaurahavaibhav@gmail.com</h3>
                        <div className="contact-action">
                            <span>SEND A MESSAGE</span>
                            <div className="action-icon-circle">
                                <ArrowUpRight size={24} color="var(--bg-color)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-copyright">
                    © {new Date().getFullYear()} VAIBHAV GAURAHA. ALL RIGHTS RESERVED.
                </div>

                <div className="social-icons-group">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link hover-target" aria-label="GitHub">
                        <Github size={22} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link hover-target" aria-label="LinkedIn">
                        <Linkedin size={22} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link hover-target" aria-label="Twitter">
                        <Twitter size={22} />
                    </a>
                    <a href="#" onClick={handleEmail} className="social-icon-link hover-target" aria-label="Email">
                        <Mail size={22} />
                    </a>
                </div>
            </div>

            {/* Cinematic Footer Glow */}
            <div className="hero-ambient-glow" style={{ top: 'auto', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, width: '150vw', height: '100vw' }}></div>
        </section>
    );
};
