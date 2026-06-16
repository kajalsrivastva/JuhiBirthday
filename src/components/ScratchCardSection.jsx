import React from 'react';
import FadeInSection from './FadeInSection';
import ScratchCard from './ScratchCard';

const ScratchCardSection = ({ title, subtext, imageSrc }) => {
  return (
    <section className="scratch-section" style={{ 
      padding: '120px 20px', 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Premium Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url(/juhi_media/birthday_bg_3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.6) contrast(1.2)',
        zIndex: 0
      }}></div>
      
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FadeInSection>
          <div style={{ 
            background: 'rgba(20, 10, 15, 0.6)', 
            padding: '40px 20px', 
            borderRadius: '20px', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <h2 className="section-title" style={{ color: 'var(--accent-gold)', textShadow: '0 0 20px rgba(212,175,55,0.4)', textAlign: 'center', marginBottom: '15px' }}>
              🎁 {title} 🎁
            </h2>
            <div className="text-divider" style={{ margin: '0 auto 20px auto', background: 'var(--accent-rose)' }}></div>
            <p className="elegant-subtext" style={{ color: '#fff', textAlign: 'center', marginBottom: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
              {subtext}
            </p>
            
            <div style={{
              padding: '10px',
              background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-rose))',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(255,105,180,0.4)'
            }}>
              <ScratchCard imageSrc={imageSrc} />
            </div>
            
            <p style={{ marginTop: '30px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              Use your finger to scratch and reveal the magic
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ScratchCardSection;
