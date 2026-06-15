import React from 'react';
import FadeInSection from './FadeInSection';
import ScratchCard from './ScratchCard';

const ScratchCardSection = ({ title, subtext, imageSrc }) => {
  return (
    <section className="scratch-section" style={{ padding: '100px 20px', backgroundColor: '#0a0a0c', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
      <FadeInSection>
        <h2 className="section-title" style={{ color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.9)', textAlign: 'center', marginBottom: '20px' }}>{title}</h2>
        <div className="text-divider" style={{ margin: '0 auto 20px auto', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
        <p className="elegant-subtext" style={{ color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.9)', textAlign: 'center', marginBottom: '50px', maxWidth: '600px' }}>{subtext}</p>
        
        <ScratchCard imageSrc={imageSrc} />
      </FadeInSection>
    </section>
  );
};

export default ScratchCardSection;
