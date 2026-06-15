import React from 'react';

const MagazineFront = ({ mediaData }) => {
  const allPhotos = mediaData.filter(m => !m.isVideo && !m.video);
  const coverPhoto = allPhotos.length > 2 ? allPhotos[2].src : (allPhotos[0]?.src || '');

  return (
    <div className="magazine-container" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      <div 
        style={{ 
          position: 'absolute', inset: -30, 
          backgroundImage: `url(${coverPhoto})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          filter: 'blur(25px) brightness(0.5)', 
          zIndex: 0 
        }} 
      />
      <div 
        className="magazine-cover" 
        style={{ 
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="magazine-overlay">
          <div className="magazine-top-bar">
            <span>SPECIAL BIRTHDAY EDITION</span>
            <span>29 JUNE 2026</span>
          </div>
          
          <h1 className="magazine-title">MEMORIES</h1>
          
          <div className="magazine-bottom-layout">
            <div className="magazine-content-left">
              <h2 className="magazine-headline">THE STORY<br/>OF US</h2>
              <p className="magazine-subtext">Exclusive: The best moments captured in time.</p>
            </div>
            
            <div className="magazine-content-right">
              <div className="magazine-feature">
                <h3>INSIDE</h3>
                <p>The smiles, the tears, and the magic of a beautiful friendship.</p>
              </div>
              <div className="magazine-feature" style={{ marginTop: '20px' }}>
                <h3 className="highlight">HAPPY BIRTHDAY!</h3>
                <p>A special tribute to the girl who makes everything better.</p>
              </div>
            </div>
          </div>
          
          <div className="magazine-barcode">
            <div className="barcode-bars"></div>
            <span className="barcode-number">1234 5678 9101</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineFront;
