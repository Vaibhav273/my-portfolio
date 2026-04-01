import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { About } from './components/About';
import { Strength } from './components/Strength';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Socials } from './components/Socials';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import './App.css';

const Home = () => (
  <>
    <div id="home">
      <Hero />
    </div>
    <MarqueeTicker />
    <About />
    <Strength />
    <Experience />
    <Education />
    <Projects />
    <Socials />
  </>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Router>
      <SmoothScroll>
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
        <div className={`app-container ${isLoaded ? 'is-loaded' : ''}`}>
          <div className="bg-glow">
            <div className="glow-1"></div>
            <div className="glow-2"></div>
          </div>
          <CustomCursor />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          
          <ScrollToTop />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;

