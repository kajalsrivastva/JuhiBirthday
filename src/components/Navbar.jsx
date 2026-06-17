import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = ({ onGoToMasti, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'section-home' },
    { label: 'Our Journey', target: 'section-journey' },
    { label: 'First Scratch Card', target: 'section-scratch' },
    { label: 'Second Scratch Card', target: 'section-scratch-2' },
    { label: 'Spin The Wheel', target: 'section-wheel' },
    { label: 'Memory Puzzle', target: 'section-puzzle' },
    { label: 'BFF Magazine', target: 'section-magazine' },
    { label: 'Secret Vault', target: 'section-vault' },
    { label: 'Masti Unplugged', target: 'masti' }
  ];

  const handleNavClick = (target) => {
    setIsOpen(false);
    if (target === 'masti') {
      if (onGoToMasti) onGoToMasti();
    } else {
      if (onNavigate) {
        onNavigate(target);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '70px',
        background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,105,180,0.2)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 9999,
        transition: 'all 0.3s ease'
      }}>
        {/* Logo / Brand */}
        <div 
          onClick={() => handleNavClick('section-home')}
          style={{ 
            color: 'var(--accent-gold)', 
            fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            letterSpacing: '1px',
            fontFamily: 'var(--font-heading)',
            lineHeight: '1.2'
          }}
        >
          Juhi Birthday Surprise 2026<span style={{ color: 'var(--accent-rose)' }}></span>
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Logout Button */}
          {onLogout && (
            <button 
              onClick={onLogout}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', 
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--accent-gold)', 
                color: 'var(--accent-gold)', padding: '6px 12px', borderRadius: '4px', 
                cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.9rem' 
              }}
            >
              <LogOut size={14} /> <span className="hide-on-mobile">Logout</span>
            </button>
          )}

          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, rgba(26, 11, 22, 0.98) 0%, rgba(51, 23, 43, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 105, 180, 0.2)',
            borderRadius: '50%',
            color: 'var(--accent-gold)',
            cursor: 'pointer',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 105, 180, 0.1)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <X size={24} />
        </button>

        {/* Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', width: '100%' }}>
          {navLinks.map((link, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div 
                key={idx}
                style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  onClick={() => handleNavClick(link.target)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isHovered ? 'var(--accent-gold)' : 'var(--text-primary)',
                    fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: isHovered ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(1px, 1vw, 4px)',
                    textShadow: isHovered ? '0 0 20px rgba(255, 105, 180, 0.4)' : 'none',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {link.label}
                </button>
                {/* Elegant Underline on Hover */}
                <div style={{
                  height: '2px',
                  width: isHovered ? '100%' : '0%',
                  background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                  transition: 'width 0.4s ease',
                  marginTop: '10px',
                  opacity: isHovered ? 1 : 0
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
