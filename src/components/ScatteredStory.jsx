import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import { Play } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const ScatteredStory = ({ photos, videos }) => {
  const [playingVideo, setPlayingVideo] = useState(null);

  if (!photos || photos.length < 3) return null;

  const topPhotos = photos.slice(0, 5);
  const topVideos = videos.slice(0, 3); // Grab 3 videos to scatter
  
  const storyTexts = [
    { title: "Pehli Mulaqat", text: "Kaun janta tha ki ek chhoti si mulaqat zindagi ka sabse khoobsurat hissa ban jayegi. That moment when two strangers became bestie for life." },
    { title: "Endless Bakwas", text: "Hamari baaton ka na koi sar hota hai, na pair. Phir bhi ek dusre ke har pagalpan ko has kar bardasht karna hi toh asli dosti hai!" },
    { title: "Crime Partner", text: "Koi pange lene ho ya bewajah bewakoofiyan karni ho, mujhe humesha pata hota hai ki tumhara saath milega. The ultimate partner in every crime." },
    { title: "Unfiltered Us", text: "Mujhe tumhare samne kabhi perfect banne ki zaroorat nahi padti. Tum meri sabse raw aur unfiltered version ko bhi utna hi pyaar karti ho." },
    { title: "Bestie By Heart", text: "Khoon ka rishta na hokar bhi dil ka sabse gehra connection. Hum sirf dost nahi, ek dusre ki aadat hain. Here's to us, forever!" }
  ];

  return (
    <section className="editorial-section">
      {topPhotos.map((photo, idx) => {
        const isEven = idx % 2 === 0;
        
        return (
          <React.Fragment key={`block-${idx}`}>
            {/* The Photo/Text Block */}
            <div className={`editorial-block ${isEven ? 'left-align' : 'right-align'}`}>
              <FadeInSection>
                <div className={`story-content-block ${isEven ? 'even' : 'odd'}`}>
                  <Tilt 
                    tiltMaxAngleX={5} 
                    tiltMaxAngleY={5} 
                    scale={1.02} 
                    transitionSpeed={2500}
                    className="tilt-wrapper"
                  >
                    <div className="editorial-content-wrapper">
                      <div className="editorial-image-container">
                        <img src={photo.src} alt={`Story ${idx}`} className="editorial-image" />
                      </div>
                      <div className="editorial-text-container">
                        <h3 className="editorial-title" style={{ position: 'relative', zIndex: 1 }}>{storyTexts[idx]?.title || "A Moment"}</h3>
                        <div className="text-divider" style={{ margin: isEven ? '20px 0' : '20px 0 20px auto', position: 'relative', zIndex: 1 }}></div>
                        <p className="editorial-body" style={{ position: 'relative', zIndex: 1 }}>{storyTexts[idx]?.text || "A beautiful memory captured forever."}</p>
                        
                        <div className="magic-sparkles-container">
                          <div className="magic-orb-glow"></div>
                          <div className="sparkle sp-1">✨</div>
                          <div className="sparkle sp-2">✨</div>
                          <div className="sparkle sp-3">✨</div>
                          <div className="sparkle sp-4">✨</div>
                          <div className="sparkle sp-5">✨</div>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </div>
              </FadeInSection>
            </div>

            {/* Scatter a Video after every 2 photos if available */}
            {(idx === 1 || idx === 3) && topVideos[idx === 1 ? 0 : 1] && (
              <div className="editorial-block" style={{ marginBottom: '120px' }}>
                <FadeInSection>
                  <div 
                    className="video-poster" 
                    style={{ position: 'relative', width: '100%', aspectRatio: '21/9', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}
                    onClick={() => setPlayingVideo(topVideos[idx === 1 ? 0 : 1].src)}
                  >
                    <video 
                      src={topVideos[idx === 1 ? 0 : 1].src} 
                      muted loop autoPlay playsInline
                      className="poster-bg-video"
                    />
                    <div className="poster-overlay">
                      <div className="giant-play-btn">
                        <Play size={40} color="var(--accent-gold)" fill="var(--accent-gold)" />
                      </div>
                      <h3 className="video-title">Play Memory</h3>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Video Modal */}
      {playingVideo && (
        <div className="modal-overlay" onClick={() => setPlayingVideo(null)} style={{zIndex: 99999}}>
          <video 
            src={playingVideo} 
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'blur(30px) brightness(0.6)', transform: 'scale(1.2)', zIndex: 0
            }} 
          />
          <button className="modal-close" onClick={() => setPlayingVideo(null)} style={{ zIndex: 2 }}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ zIndex: 1, background: 'transparent' }}>
            <video 
              src={playingVideo} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block', position: 'relative' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ScatteredStory;
