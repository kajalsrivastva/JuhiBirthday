import React from 'react';
import FadeInSection from './FadeInSection';

const EditorialStory = ({ photos }) => {
  if (!photos || photos.length < 3) return null;

  const topPhotos = photos.slice(0, 5);
  const storyTexts = [
    { title: "The Spark", text: "Every beautiful journey begins with a single moment of connection." },
    { title: "Unforgettable", text: "Some memories are etched in time, refusing to fade away." },
    { title: "Laughter", text: "The kind of joy that fills the room and warms the soul." },
    { title: "Adventures", text: "To the places we've been and the horizons yet to explore." },
    { title: "Together", text: "Through every season, a bond that only grows stronger." }
  ];

  return (
    <section className="editorial-section">
      {topPhotos.map((photo, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={idx} className={`editorial-block ${isEven ? 'left-align' : 'right-align'}`}>
            <FadeInSection>
              <div className="editorial-content-wrapper">
                <div className="editorial-image-container">
                  <img src={photo.src} alt={`Story ${idx}`} className="editorial-image" />
                </div>
                <div className="editorial-text-container">
                  <h3 className="editorial-title">{storyTexts[idx]?.title || "A Moment"}</h3>
                  <div className="text-divider" style={{ margin: isEven ? '20px 0' : '20px 0 20px auto' }}></div>
                  <p className="editorial-body">{storyTexts[idx]?.text || "A beautiful memory captured forever."}</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        );
      })}
    </section>
  );
};

export default EditorialStory;
