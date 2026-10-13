import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Photography from './components/Photography/Photography';
import BeforeAfter from './components/BeforeAfter/BeforeAfter';
import VideoEditing from './components/VideoEditing/VideoEditing';
import Process from './components/Process/Process';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import { scrollToSection } from './utils/scroll';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle browser back and forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (!window.location.pathname.startsWith('/project/') && window.location.hash) {
        requestAnimationFrame(() => {
          scrollToSection(window.location.hash, true);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isProjectRoute = currentPath.startsWith('/project/');
  const projectSlug = isProjectRoute ? currentPath.replace('/project/', '') : null;

  // Render-cycle safe hash scroll handler when navigating back to homepage sections or on load
  useEffect(() => {
    if (!isProjectRoute) {
      const hash = window.location.hash;
      if (hash) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection(hash, false);
          });
        });
      }
    }
  }, [currentPath, isProjectRoute]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(window.location.pathname);

    // If navigating to a hash on the homepage
    if (!path.startsWith('/project/')) {
      const hash = window.location.hash;
      if (hash) {
        requestAnimationFrame(() => {
          scrollToSection(hash, true);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app">
      <Navbar onNavigate={navigate} />

      {isProjectRoute ? (
        <ProjectDetail slug={projectSlug} onNavigate={navigate} />
      ) : (
        <>
          <Hero />
          <Photography />
          <BeforeAfter />
          <VideoEditing />
          <Process />
          <About />
          <Contact />
        </>
      )}

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;






