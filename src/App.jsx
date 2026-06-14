import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import PasswordScreen from './components/PasswordScreen';
import CinematicWelcome from './components/CinematicWelcome';
import SurpriseBox from './components/SurpriseBox';
import EnvelopeSlide from './components/EnvelopeSlide';
import MagazineFront from './components/MagazineFront';
import VideoSlider from './components/VideoSlider';
import StoryTimeline from './components/StoryTimeline';
import FinalEnding from './components/FinalEnding';
import BirthdaySurpriseModal from './components/BirthdaySurpriseModal';
import SpecialVideoTransition from './components/SpecialVideoTransition';
import './index.css';
import mediaData from './mediaList.json';

function App() {
  const [stage, setStage] = useState('password'); 
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  
  const [introMedia, setIntroMedia] = useState({ photos: [], video: null });
  const [remainingPhotos, setRemainingPhotos] = useState([]);
  const [allVideosList, setAllVideosList] = useState([]);

  const playlist = [
    '/songs/tera-yaar-hoon-main.webm'
  ];

  useEffect(() => {
    // Filter out the transition video and the ONE hidden surprise video
    const allVideos = mediaData.filter(m => {
      if (!m.isVideo && !m.video) return false;
      const src = m.src;
      // Transition video (Green saree - Smile please!)
      if (src.includes('VID_20260610_100120_947.mp4')) return false; 
      
      // Hidden surprise balloon video (Cake cutting)
      if (src.includes('InShot_20250813_003150820.mp4')) return false;
      
      return true;
    });
    const allPhotos = mediaData.filter(m => !m.isVideo && !m.video);
    
    // Pick 3 photos ONLY for the Surprise Box
    const introPhotos = allPhotos.slice(0, 3);
    setIntroMedia({ photos: introPhotos, video: null });
    
    const remainingPics = allPhotos.slice(3);
    setRemainingPhotos(remainingPics);
    setAllVideosList(allVideos);
  }, []);

  const handleSongEnd = () => {
    setCurrentSongIndex(0);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current && stage !== 'password' && stage !== 'cinematic') {
      audioRef.current.volume = 0.8;
      if (isMusicPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Auto-play blocked:", e);
          setIsMusicPlaying(false);
        });
      }
    }
  }, [stage]);

  useEffect(() => {
    if (audioRef.current && stage !== 'password' && stage !== 'cinematic' && isMusicPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Audio play failed:", e);
        setIsMusicPlaying(false);
      });
    }
  }, [currentSongIndex, stage]);

  const startInitialMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch(e => {
        console.log("Audio play failed:", e);
        setIsMusicPlaying(false);
      });
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="app-container">
      <audio 
        ref={audioRef} 
        src={playlist[currentSongIndex]} 
        onEnded={handleSongEnd}
        preload="auto"
      />

      {stage !== 'password' && stage !== 'cinematic' && (
        <div className="music-controls" style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 9998, 
          display: 'flex', gap: '15px', alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.3)', padding: '10px 15px', borderRadius: '40px', backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <button 
            onClick={toggleMusic}
            style={{ border: 'none', borderRadius: '50%', width: '60px', height: '60px', background: 'var(--accent-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isMusicPlaying ? <Volume2 size={28} color="white" /> : <VolumeX size={28} color="white" />}
          </button>
        </div>
      )}

      {stage === 'password' && (
        <PasswordScreen onUnlock={() => setStage('cinematic')} />
      )}

      {stage === 'cinematic' && (
        <CinematicWelcome 
          onFinish={() => setStage('box')} 
          onStartMusic={startInitialMusic}
        />
      )}
      
      {stage === 'box' && (
        <SurpriseBox 
          introMedia={introMedia} 
          onOpen={() => setStage('envelope')} 
        />
      )}

      {stage === 'envelope' && (
        <EnvelopeSlide onFinish={() => setStage('special_video')} />
      )}

      {stage === 'special_video' && (
        <SpecialVideoTransition onFinish={() => setStage('story')} />
      )}
      
      {stage === 'story' && (
        <div className="main-content show">
          <MagazineFront mediaData={mediaData} />
          <VideoSlider videos={allVideosList} />
          <StoryTimeline media={remainingPhotos} />
          <FinalEnding onRestart={() => setStage('password')} />
          <BirthdaySurpriseModal photos={remainingPhotos} />
        </div>
      )}
    </div>
  );
}

export default App;
