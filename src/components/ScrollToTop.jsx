import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollToTop = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScroll = () => {
    if (isAtTop) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      onClick={handleScroll}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 105, 180, 0.2)',
        border: '2px solid var(--accent-gold)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        boxShadow: '0 0 15px rgba(255, 105, 180, 0.4)',
        animation: 'fadeIn 0.3s ease-out',
        transition: 'transform 0.3s, background-color 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 105, 180, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 105, 180, 0.2)';
      }}
    >
      {isAtTop ? (
        <ArrowDown color="var(--accent-gold)" size={24} />
      ) : (
        <ArrowUp color="var(--accent-gold)" size={24} />
      )}
    </div>
  );
};

export default ScrollToTop;
