import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import PasswordScreen from './components/PasswordScreen';
import PremiumHero from './components/PremiumHero';
import TextMessageSection from './components/TextMessageSection';
import ScatteredStory from './components/ScatteredStory';
import InteractiveVideoShowcase from './components/InteractiveVideoShowcase';
import SurpriseBox from './components/SurpriseBox';
import MagazineSpread from './components/MagazineSpread';
import StoryTimeline from './components/StoryTimeline';
import TheVault from './components/TheVault';
import InteractiveGallery from './components/InteractiveGallery';
import SecretMessage from './components/SecretMessage';
import MemoryPuzzle from './components/MemoryPuzzle';
import ScratchCardSection from './components/ScratchCardSection';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import './index.css';
import mediaData from './mediaList.json';
import playlistData from './playlist.json';

function App() {
  const [stage, setStage] = useState('password'); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);

  useEffect(() => {
    // Shuffle the playlist on mount so songs play randomly
    const shuffled = [...playlistData].sort(() => Math.random() - 0.5);
    setShuffledPlaylist(shuffled);
  }, []);
  
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [hiddenVideo, setHiddenVideo] = useState(null);
  const [heroBg, setHeroBg] = useState(null);

  useEffect(() => {
    // Separate media
    const allVideos = mediaData.filter(m => {
      if (!m.isVideo && !m.video) return false;
      const src = m.src;
      // Filter out transition video
      if (src.includes('VID_20260610_100120_947.mp4')) return false; 
      // Keep hidden video separate
      if (src.includes('InShot_20250813_003150820.mp4')) {
        setHiddenVideo(src);
        return false;
      }
      return true;
    });
    
    const allPhotos = mediaData.filter(m => !m.isVideo && !m.video);
    
    setVideos(allVideos);
    setPhotos(allPhotos);
    if(allPhotos.length > 0) {
      setHeroBg(allPhotos[0].src); // Use first photo as hero background
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play error:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleNextSong = (e) => {
    e.stopPropagation();
    if (shuffledPlaylist.length > 0) {
      setCurrentSongIndex((prev) => (prev + 1) % shuffledPlaylist.length);
      setIsMusicPlaying(true);
    }
  };

  const handlePrevSong = (e) => {
    e.stopPropagation();
    if (shuffledPlaylist.length > 0) {
      setCurrentSongIndex((prev) => (prev - 1 + shuffledPlaylist.length) % shuffledPlaylist.length);
      setIsMusicPlaying(true);
    }
  };

  const handleUnlock = () => {
    setStage('welcomeVideo');
  };

  const finishWelcomeVideo = () => {
    setStage('website');
    setIsMusicPlaying(true);
  };

  useEffect(() => {
    if (stage === 'website' && isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log("Autoplay blocked:", e);
        setIsMusicPlaying(false);
      });
    } else if (audioRef.current && !isMusicPlaying) {
      audioRef.current.pause();
    }
  }, [stage, isMusicPlaying, currentSongIndex]);

  return (
    <div className="app-container">
      {(stage === 'website' || stage === 'masti') && shuffledPlaylist.length > 0 && (
        <audio 
          ref={audioRef}
          src={shuffledPlaylist[currentSongIndex]}
          autoPlay={isMusicPlaying}
          onEnded={() => {
            setCurrentSongIndex((prev) => (prev + 1) % shuffledPlaylist.length);
          }}
          onError={() => {
            setCurrentSongIndex((prev) => (prev + 1) % shuffledPlaylist.length);
          }}
        />
      )}

      {stage === 'password' && (
        <PasswordScreen onUnlock={handleUnlock} bgImage="/juhi_media/password_bg.png" avatarImage="/juhi_media/file_0000000091f47209bcb30ef304b5d292.png" />
      )}

      {stage === 'welcomeVideo' && (
        <div style={{ 
          position: 'fixed', inset: 0, 
          backgroundImage: 'linear-gradient(to bottom, rgba(26, 11, 22, 0.4), rgba(26, 11, 22, 0.7)), url(/juhi_media/birthday_theme_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
        }}>
          <video 
            src="/juhi_media/InShot_20260612_003622182.mp4" 
            autoPlay 
            controls
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain', background: 'transparent' }}
            onEnded={finishWelcomeVideo}
          />
          <button 
            onClick={finishWelcomeVideo} 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', zIndex: 10001 }}
          >
            Skip &gt;&gt;
          </button>
        </div>
      )}

      {stage === 'website' && (
        <>
          <ParticleBackground />
          <ScrollToTop />
          <div className="journey-line"></div>
        </>
      )}

      {/* Persistent Music Controller */}
      {(stage === 'website' || stage === 'masti') && (
          <div style={{
            position: 'fixed', bottom: '30px', right: '30px', zIndex: 9998,
            background: 'rgba(20, 20, 20, 0.8)', padding: '12px 24px', borderRadius: '30px',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 105, 180, 0.4)',
            display: 'flex', alignItems: 'center', gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
          }}>
            <SkipBack 
              size={22} 
              color="#d4af37" 
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }} 
              onClick={handlePrevSong}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div 
              onClick={toggleMusic} 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isMusicPlaying ? <Volume2 size={26} color="#d4af37" /> : <VolumeX size={26} color="#d4af37" />}
            </div>
            <SkipForward 
              size={22} 
              color="#d4af37" 
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }} 
              onClick={handleNextSong}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
      )}
      {stage === 'website' && (
        <>
          <Navbar 
            onGoToMasti={() => {
              setStage('masti');
              window.scrollTo(0, 0);
            }} 
            onLogout={() => { setStage('password'); setIsMusicPlaying(false); }}
          />

          <div id="section-home">
            <PremiumHero bgImage={heroBg} onLogout={() => { setStage('password'); setIsMusicPlaying(false); }} />
          </div>
          
          <div id="section-beginning">
            <TextMessageSection 
              title="The Beginning"
              message="Ek waqt tha jab hum dono ek dusre ke liye bilkul anjaan the. Na baat hoti thi, na koi khaas pehchaan. Phir dheere-dheere baatein shuru hui, nok-jhok hui, kabhi behas hui, kabhi hasi-mazaak. Kabhi tum mujhse naraz hui, kabhi main tumse. Lekin shayad wahi chhoti-chhoti nok-jhok hamari dosti ko aur gehra banati gayi."
            />
          </div>

          <SurpriseBox 
            videoSrc="/juhi_media/InShot_20260613_004715679.mp4" 
            bgImage={photos.length > 0 ? photos[photos.length - 2]?.src : null}
          />

          <div id="section-journey">
            <ScatteredStory 
              photos={photos} 
              videos={videos} 
              onGoToMasti={() => {
                setStage('masti');
                window.scrollTo(0, 0);
              }}
            />
          </div>

          <ScratchCardSection 
            title="Scratch Your Surprise!" 
            subtext="Kuch yaadein chhipi hui hoti hain. Scratch karein aur dekhein kya surprise hai!" 
            imageSrc="/juhi_media/IMG-20260226-WA0136.jpg" 
          />

          <div id="section-puzzle">
            <MemoryPuzzle 
              photos={photos} 
              videos={videos}
            />
          </div>

          <TextMessageSection 
            title="The Journey"
            message="Aaj sochti hoon to lagta hai ki anjaan se shuru hua safar itna khoobsurat hoga, kabhi socha hi nahi tha. Aaj hum do alag log nahi, balki ek dusre ki khushi, takleef aur yaadon ka hissa ban chuke hain. Hamari har ladai ke baad wali sulah aur har muskurahat ne is dosti ko aur bhi khaas bana diya. ❤️"
          />

          <SurpriseBox 
            title="Sweet Memory"
            message="Ek aur chhota sa surprise tumhare liye, kyunki tumhari har muskurahat mere liye bahut khaas hai. Tap to open!"
            videoSrc="/juhi_media/VID_20251021_085311_041.mp4" 
            bgImage={photos.length > 0 ? photos[photos.length - 5]?.src : null}
          />


          <TextMessageSection 
            title="A True Blessing"
            message="Kehte hain ki Bhagwan har jagah khud nahi pahunch sakte, isliye woh apni taraf se kuch khaas log bhejte hain. Aur jab kabhi khoon ke rishte saath na de paaye ya samajh na paaye, tab Bhagwan ek saccha best friend de dete hain jo bina kisi matlab ke hamesha saath khada rehta hai. ❤️"
          />

          <div id="section-magazine">
            <MagazineSpread 
              photos={photos} 
              calendarVideoSrc="/juhi_media/VID_20260225_205339_824.mp4" 
              featuredPhoto="/juhi_media/file_000000004d8c7209b311dd8d13ee4b9e.png"
            />
          </div>

          <SurpriseBox 
            title="A Golden Memory"
            message="Kuch yaadein seedha dil mein utar jaati hain. Ek aur khoobsurat pal, sirf tumhare liye."
            videoSrc="/juhi_media/VID_20260610_100058_965.mp4" 
            bgImage={photos.length > 0 ? photos[15]?.src : null}
            iconType="heart"
          />

          <div id="section-vault">
            <TheVault 
              allPhotos={photos.slice(5)} 
              bgImage={photos.length > 0 ? photos[photos.length - 3]?.src : null}
            />
          </div>

          <ScratchCardSection 
            title="One More Surprise!" 
            subtext="Ek aur khoobsurat pal, sirf tumhare liye." 
            imageSrc="/juhi_media/WhatsApp Image 2026-06-15 at 5.07.01 AM.jpeg" 
          />

          <TextMessageSection 
            title="Forever Besties"
            message="Meri zindagi mein tum wahi tohfa ho. Khoon ka rishta na hote hue bhi tumne har khushi aur har mushkil mein apna saath diya. Shayad isi liye kehte hain ki kuch rishte janam se nahi, dil se bante hain. 🫶"
          />

          <div style={{ padding: '50px 20px', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                setStage('masti');
                window.scrollTo(0, 0);
              }}
              style={{
                background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-rose))',
                color: '#fff', border: 'none', padding: '20px 40px', fontSize: '1.5rem',
                borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold',
                boxShadow: '0 15px 30px rgba(255,105,180,0.4)', transition: 'transform 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🔓 Play Treasure Hunt Game
            </button>
          </div>

          <SecretMessage 
            hiddenVideoSrc={hiddenVideo} 
            bgImage={photos.length > 0 ? photos[photos.length - 4]?.src : null}
          />

          <footer className="footer">
            <div className="footer-text">Made with ❤️ for Juhi</div>
          </footer>
        </>
      )}

      {stage === 'masti' && (
        <InteractiveVideoShowcase 
          videos={videos.slice(2)} 
          onBack={() => {
            setStage('website');
            window.scrollTo(0, 0);
          }} 
        />
      )}
    </div>
  );
}

export default App;
