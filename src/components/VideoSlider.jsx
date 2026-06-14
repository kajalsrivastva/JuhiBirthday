import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

const VideoSlider = ({ videos }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const videoRefs = useRef({});

  const texts = [
    "Those unforgettable laughs...",
    "A moment to remember ✨",
    "Best times ever!",
    "When time stood still ⏳",
    "Crazy times with my bestie 💖",
    "Pure joy captured! 🎬",
    "Smile please! 😊",
    "Memories that last forever ❤️"
  ];

  const handlePlay = (id) => {
    if (playingVideoId && playingVideoId !== id && videoRefs.current[playingVideoId]) {
      videoRefs.current[playingVideoId].pause();
    }
    setPlayingVideoId(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id].play();
    }
  };

  const handleVideoClick = (id) => {
    const vid = videoRefs.current[id];
    if (vid) {
      if (vid.paused) {
        handlePlay(id);
      } else {
        vid.pause();
        setPlayingVideoId(null);
      }
    }
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-slider-section">
      <h2 className="chapter-title" style={{ marginTop: '50px' }}>Our Magical Reels</h2>
      <div className="video-slider-container">
        {videos.map((vid, idx) => {
          const isPlaying = playingVideoId === (vid.id || idx);

          return (
            <div key={vid.id || idx} className="video-slide-item">
              <div className="glowing-film-strip video-slide-inner">
                <div className="film-holes top"></div>
                
                <div className="video-media-wrapper" onClick={() => handleVideoClick(vid.id || idx)}>
                  <video 
                    ref={el => videoRefs.current[vid.id || idx] = el}
                    src={vid.src} 
                    className="slider-video"
                    playsInline
                    loop
                  />
                  
                  {!isPlaying && (
                    <div className="video-text-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)', justifyContent: 'flex-end', paddingBottom: '30px' }}>
                      <p className="video-overlay-msg" style={{ fontSize: '1.5rem', textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>
                        {texts[idx % texts.length]}
                      </p>
                      <div className="play-overlay" style={{ position: 'relative', marginTop: '10px' }}>
                        <Play color="white" size={40} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="film-holes bottom"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSlider;
