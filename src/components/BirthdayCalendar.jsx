import React from 'react';
import FadeInSection from './FadeInSection';

const BirthdayCalendar = ({ featuredPhoto }) => {
  // Generate a simple calendar grid for a 30-day month starting on a generic day
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section className="calendar-section" style={{ padding: '100px 20px', background: 'var(--bg-primary)' }}>
      <FadeInSection>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="editorial-title" style={{ fontSize: '3rem', marginBottom: '40px' }}>
            The Golden Date
          </h2>
          <div className="text-divider"></div>
          
          <div className="calendar-grid">
            <div className="calendar-header">Sun</div>
            <div className="calendar-header">Mon</div>
            <div className="calendar-header">Tue</div>
            <div className="calendar-header">Wed</div>
            <div className="calendar-header">Thu</div>
            <div className="calendar-header">Fri</div>
            <div className="calendar-header">Sat</div>
            
            {/* Blank spaces for starting day (let's say month starts on a Thursday, so 4 blanks) */}
            <div className="calendar-cell empty"></div>
            <div className="calendar-cell empty"></div>
            <div className="calendar-cell empty"></div>
            <div className="calendar-cell empty"></div>

            {days.map(day => (
              <div 
                key={day} 
                className={`calendar-cell ${day === 29 ? 'special-day' : ''}`}
              >
                {day === 29 && featuredPhoto ? (
                  <div className="special-day-photo">
                    <img src={featuredPhoto} alt="Juhi" />
                    <div className="special-day-overlay">29</div>
                  </div>
                ) : (
                  <span className="calendar-number">{day}</span>
                )}
              </div>
            ))}
          </div>
          
          <p className="elegant-subtext" style={{ marginTop: '30px', fontSize: '1.2rem', fontStyle: 'italic' }}>
            A day the world became a little brighter.
          </p>
        </div>
      </FadeInSection>
    </section>
  );
};

export default BirthdayCalendar;
