import React from 'react';
import FadeInSection from './FadeInSection';

const TextMessageSection = ({ title, message, subtext }) => {
  const paragraphs = message.split('\n').filter(p => p.trim() !== '');

  return (
    <section className="text-section">
      <FadeInSection>
        {title && <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '30px' }}>{title}</h2>}
        <div className="elegant-text">
          {paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: idx === paragraphs.length - 1 ? 0 : '25px', lineHeight: '1.8' }}>
              {paragraphs.length === 1 ? `"${p}"` : p}
            </p>
          ))}
        </div>
        <div className="text-divider"></div>
        {subtext && <div className="elegant-subtext">{subtext}</div>}
      </FadeInSection>
    </section>
  );
};

export default TextMessageSection;
