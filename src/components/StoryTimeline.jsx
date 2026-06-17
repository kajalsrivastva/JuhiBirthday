import React, { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import AudioButton from './AudioButton';

const chapters = [
  { id: 'ch1', title: 'First Meeting 🌸', pCount: 10, vCount: 2 },
  { id: 'ch2', title: 'First Coffee ☕', pCount: 15, vCount: 2 },
  { id: 'ch3', title: 'Birthday Celebration 🎂', pCount: 12, vCount: 3 },
  { id: 'ch4', title: 'First Trip 🚗', pCount: 20, vCount: 3 },
  { id: 'final', title: 'Unforgettable Memories 🌅', pCount: Infinity, vCount: Infinity }
];

const quotes = [
  "Har tasveer ek kahani kehti hai. ❤️",
  "Waqt guzar gaya, par yeh lamhe aaj bhi waise hi hain. 🌸",
  "Camera ne sirf photo li, dil ne ehsaas sambhal liya. ✨"
];

const StoryTimeline = ({ media }) => {
  const [activeMedia, setActiveMedia] = useState(null);
  const [chapterData, setChapterData] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    const allVideos = media.filter(m => m.isVideo || m.video);
    const allPhotos = media.filter(m => !m.isVideo && !m.video);

    let vIdx = 0;
    let pIdx = 0;

    const distributed = chapters.map(ch => {
      const vSlice = allVideos.slice(vIdx, vIdx + ch.vCount);
      vIdx += vSlice.length;

      const pSlice = allPhotos.slice(pIdx, pIdx + ch.pCount);
      pIdx += pSlice.length;

      let mixed = [];
      let pTemp = [...pSlice];
      let vTemp = [...vSlice];

      while(pTemp.length > 0 || vTemp.length > 0) {
        if (pTemp.length > 0) mixed.push(...pTemp.splice(0, 5));
        if (vTemp.length > 0) mixed.push(vTemp.shift());
      }

      return {
        ...ch,
        items: mixed
      };
    });

    setChapterData(distributed);
  }, [media]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.scrapbook-item, .chapter-title');
      elements.forEach(el => observer.current?.observe(el));
    }, 500);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [chapterData]);

  const handleMediaClick = (item) => {
    if (item.video || item.isVideo) {
      setActiveMedia(item.video || item.src);
      const audio = document.querySelector('audio');
      if (audio) audio.pause();
    }
  };

  const closeVideo = () => {
    setActiveMedia(null);
    const audio = document.querySelector('audio');
    if (audio) audio.play().catch(e => console.log(e));
  };

  return (
    <div className="story-timeline-container">
      {chapterData.map((chapter, chapterIndex) => (
        <div key={chapter.id} className="chapter-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <h2 className="chapter-title" style={{ margin: 0 }}>{chapter.title}</h2>
            <AudioButton text={chapter.title} size={24} />
          </div>
          
          <div className="masonry-gallery">
            {chapter.items.map((item, idx) => {
              const rot = `${(idx % 2 === 0 ? -1 : 1) * (Math.random() * 5 + 2)}deg`;
              
              const handleMouseMove = (e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                el.style.zIndex = 20;
              };

              const handleMouseLeave = (e) => {
                const el = e.currentTarget;
                el.style.transform = `rotate(var(--rot)) translateY(0) scale(1)`;
                el.style.zIndex = 1;
              };

              return (
                <div 
                  key={idx} 
                  className="scrapbook-item"
                  style={{ '--rot': rot }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMediaClick(item)}
                >
                  <div className="tape"></div>
                  <img src={item.src} alt={item.title || 'Memory'} className="scrapbook-media" loading="lazy" />
                  
                  {idx % 5 === 0 && (
                    <div className="scrapbook-quote" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="paper-clip"></div>
                      <p>"{quotes[(chapterIndex * 5 + idx) % quotes.length]}"</p>
                      <AudioButton text={quotes[(chapterIndex * 5 + idx) % quotes.length]} size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Video Modal */}
      {activeMedia && (
        <div className="modal-overlay" onClick={closeVideo} style={{ zIndex: 100000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVideo}>
              <X size={24} />
            </button>
            <video 
              src={activeMedia} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '80vh', borderRadius: '10px' }}
              onEnded={closeVideo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryTimeline;
