import React, { useRef, useState } from 'react';

const VideoWishes = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
    // Pause background music if it's playing
    const audio = document.querySelector('audio');
    if (audio) audio.pause();
  };

  const handlePause = () => {
    // Resume background music when video pauses or ends
    const audio = document.querySelector('audio');
    if (audio) audio.play().catch(e => console.log(e));
  };

  return (
    <section className="video-section section-container">
      <h2 className="section-title">Special Wishes</h2>
      <p className="section-subtitle">A little surprise just for you... 🎂</p>
      
      <div className="video-container" style={{ position: 'relative', cursor: 'pointer', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <video 
          ref={videoRef}
          src="/juhi_media/InShot_20260613_004715679.mp4" 
          controls={isPlaying}
          onPause={handlePause}
          onEnded={handlePause}
          style={{ width: '100%', height: '100%', display: 'block' }}
        ></video>
        
        {!isPlaying && (
          <div className="video-placeholder" onClick={handlePlayClick} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', zIndex: 10 }}>
            <div className="play-button">
              <div className="play-triangle"></div>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'white', marginTop: '15px' }}>
              Click to Watch 🎬
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoWishes;
