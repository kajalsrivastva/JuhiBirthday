import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import { Play } from 'lucide-react';

const VideoMoments = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="video-section">
      <FadeInSection>
        <div className="section-header">
          <h2 className="section-title">Cinematic Memories</h2>
          <div className="text-divider"></div>
        </div>

        <div className="video-grid">
          {videos.map((vid, index) => (
            <div 
              key={index} 
              className="video-card"
              onClick={() => setSelectedVideo(vid)}
            >
              <div className="video-thumbnail">
                {/* A silent looping video preview acts as a thumbnail */}
                <video src={vid.src} muted loop playsInline autoPlay />
                <div className="play-icon">
                  <Play color="white" size={24} fill="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <button className="modal-close" onClick={() => setSelectedVideo(null)}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <video 
              src={selectedVideo.src} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoMoments;
