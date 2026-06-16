import React from 'react';
import FadeInSection from './FadeInSection';
import { TypeAnimation } from 'react-type-animation';

const TextMessageSection = ({ title, message, subtext }) => {
  return (
    <section className="text-section">
      <FadeInSection>
        {title && <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '30px' }}>{title}</h2>}
        <div className="elegant-text">
          <TypeAnimation
            sequence={[
              message,
              1000,
            ]}
            wrapper="div"
            cursor={true}
            speed={70}
            style={{ whiteSpace: 'pre-line', lineHeight: '1.8', minHeight: '120px' }}
          />
        </div>
        <div className="text-divider"></div>
        {subtext && <div className="elegant-subtext">{subtext}</div>}
      </FadeInSection>
    </section>
  );
};

export default TextMessageSection;
