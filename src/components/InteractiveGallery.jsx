import React, { useState } from 'react';
import FadeInSection from './FadeInSection';

const InteractiveGallery = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery-section">
      <FadeInSection>
        <div className="section-header">
          <h2 className="section-title">A Journey in Frames</h2>
          <div className="text-divider"></div>
        </div>
        
        <div className="masonry-grid">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(photo)}
            >
              <img src={photo.src} alt={`Memory ${index + 1}`} className="gallery-img" />
              <div className="gallery-hover-overlay">
                <span className="hover-text">Open Memory</span>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
          <div className="modal-content" style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt="Selected" 
              style={{ maxHeight: '90vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveGallery;
