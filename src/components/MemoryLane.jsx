import React, { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import mediaList from '../mediaList.json';

const MemoryLane = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const observer = useRef(null);

  const topMemories = [
    { id: 1, title: 'Hamesha Sath 🥺', src: '/juhi_media/IMG-20240825-WA0032.jpg', isVideo: false },
    { id: 2, title: 'Besties For Life ❤️', src: '/juhi_media/IMG-20240825-WA0031.jpg', isVideo: false },
    { id: 3, title: 'Click To Play Video 🎬', src: '/juhi_media/IMG-20240804-WA0155.jpg', video: '/juhi_media/InShot_20260612_003622182.mp4', isVideo: false },
    { id: 4, title: 'Khilate Khilate Pyar 🥟', src: '/juhi_media/IMG-20240825-WA0025.jpg', isVideo: false },
    { id: 5, title: 'Mera Pyaara Hug 🤗', src: '/juhi_media/IMG_20241101_131221.jpg', isVideo: false }
  ];

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.clean-gallery-item');
    elements.forEach(el => observer.current.observe(el));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleMediaClick = (item) => {
    if (item.video || item.isVideo) {
      setActiveVideo(item.video || item.src);
      const audio = document.querySelector('audio');
      if (audio) audio.pause();
    }
  };

  const closeVideo = () => {
    setActiveVideo(null);
    const audio = document.querySelector('audio');
    if (audio) audio.play().catch(e => console.log(e));
  };

  return (
    <section id="memory-lane" className="section-container" style={{ paddingBottom: '100px', overflowX: 'hidden' }}>
      <h2 className="section-title">Hamari Anmol Yaadein</h2>
      <p className="section-subtitle">Kuch yaadein ek frame mein, aur baaki jaadoo banke bikhar gayi... ✨</p>
      
      {/* 1. Magic Slider for Top Memories */}
      <div className="magic-slider-container">
        {topMemories.map((item) => (
          <div 
            key={item.id} 
            className="magic-slide-item" 
            onClick={() => handleMediaClick(item)}
          >
            {item.isVideo ? (
              <div className="gallery-video-placeholder">
                <Play color="white" size={50} />
              </div>
            ) : (
              <img src={item.src} alt={item.title} className="gallery-img" loading="lazy" />
            )}
            <div className="gallery-overlay">
              {item.video && !item.isVideo && <Play color="white" size={40} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }} />}
              <span className="gallery-text">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Clean Animated Grid for the Rest */}
      <div className="clean-gallery-grid">
        {mediaList.map((item, index) => {
          return (
            <div 
              key={item.id} 
              className="clean-gallery-item"
              onClick={() => handleMediaClick(item)}
              style={{ animationDelay: `${(index % 5) * 0.1}s` }}
            >
              {item.isVideo ? (
                <div className="gallery-video-placeholder" style={{ height: '250px' }}>
                  <Play color="white" size={40} />
                </div>
              ) : (
                <img src={item.src} alt={item.title} className="gallery-img" loading="lazy" style={{ height: '250px' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-close-btn" onClick={closeVideo}>
              <X size={24} color="white" />
            </button>
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '80vh', borderRadius: '10px' }}
              onPause={(e) => {}}
              onEnded={(e) => closeVideo()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryLane;
