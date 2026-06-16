import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import { Play } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import SpinTheWheel from './SpinTheWheel';
import AudioButton from './AudioButton';

const ScatteredStory = ({ photos, videos, onGoToMasti }) => {
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isEven ? 'flex-start' : 'flex-end', gap: '15px', position: 'relative', zIndex: 1 }}>
                          <h3 className="editorial-title" style={{ margin: 0 }}>{storyTexts[idx]?.title || "A Moment"}</h3>
                          <AudioButton text={`${storyTexts[idx]?.title || "A Moment"}. ${storyTexts[idx]?.text || "A beautiful memory captured forever."}`} size={20} />
                        </div>
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
              <div className="editorial-block" style={{ marginBottom: '120px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
                
                {/* The Video Poster */}
                <div style={{ flex: '1 1 400px', minWidth: '300px', maxWidth: '600px' }}>
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

                {/* Spin the Wheel (Only render on idx === 1 to fill space, or other custom element) */}
                {idx === 1 && (
                  <div style={{ flex: '1 1 400px', minWidth: '300px', maxWidth: '500px', display: 'flex', justifyContent: 'center' }}>
                    <FadeInSection>
                      <SpinTheWheel onGoToMasti={onGoToMasti} />
                    </FadeInSection>
                  </div>
                )}

              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Video Modal */}
      {playingVideo && (
        <div className="modal-overlay" onClick={() => setPlayingVideo(null)} style={{
          zIndex: 99999, 
          background: 'rgba(26,11,22,0.85)',
          backgroundImage: 'url(/juhi_media/birthday_theme_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(10px)'
        }}>

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
