import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    year: '2022 - Present',
    degree: 'M.Sc. Computer Science',
    institution: 'University of Example',
    details: [
      'Specialized in Human‑Computer Interaction and 3D graphics.',
      'Thesis: "Real‑time WebGL glassmorphic UI patterns".',
    ],
  },
  {
    year: '2018 - 2022',
    degree: 'B.Sc. Information Technology',
    institution: 'Tech Institute',
    details: [
      'Graduated with honors, GPA 3.9/4.0.',
      'Lead developer of campus AR showcase project.',
    ],
  },
];

export const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background movement
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animate center line drawing down
      gsap.fromTo(lineRef.current, 
        { height: 0 }, 
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.premium-education-timeline',
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          }
      });

      // Card reveal animations
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -80 : 80, y: 50 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="parallax-education-section" ref={sectionRef}>
      <div className="parallax-bg-pattern-edu" ref={bgRef} />

      <div className="education-header">
        <h2>
          <span className="outline-text">ACADEMIC</span> FOUNDATION
        </h2>
      </div>

      <div className="premium-education-timeline">
        <div className="timeline-center-line" ref={lineRef}></div>
        {educationData.map((edu, idx) => (
          <div
            key={idx}
            className={`premium-edu-node ${idx % 2 === 0 ? 'left-node' : 'right-node'}`}
            ref={el => { cardsRef.current[idx] = el; }}
          >
            <div className="edu-node-dot"></div>
            <div className="edu-node-content glass-panel hover-target">
              <div className="edu-year-badge">{edu.year}</div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <h4 className="edu-institution">{edu.institution}</h4>
              <ul className="edu-details-list">
                {edu.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
