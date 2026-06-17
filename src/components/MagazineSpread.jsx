import React, { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import { Play, Sparkles, Heart, Pause, PlayCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import AudioButton from './AudioButton';

const MagazineSpread = ({ photos, calendarVideoSrc, featuredPhoto }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const slideshowPhotos = photos.slice(15, 31);
  
  const hindiQuotes = [
    "Kuch rishtey khoon ke nahi hote, par zindagi ban jaate hain. Tum bilkul waisi hi ho mere liye.",
    "Chahe duniya idhar ki udhar ho jaye, par tumhara aur mera bond hamesha sabse special rahega.",
    "Zindagi ka sabse khubsurat tohfa ek saccha dost hota hai, aur mujhe wo tum mein mil gaya.",
    "Bina kuch kahe meri har baat samajh jana... yeh jaadu sirf tumhe aata hai.",
    "Rona ho ya hasna, sabse pehla khayal hamesha tumhara hi aata hai.",
    "Zindagi ke har safar mein, tumhara saath hona meri sabse badi takat hai.",
    "Log kehte hain farishte aasman me hote hain, maine zameen par ek dekha hai... meri best friend!",
    "Tum sirf ek dost nahi, meri chosen family ka sabse eham hissa ho.",
    "Hazaron baatein karni hoti hain, par tumse milte hi bas hasi aati hai. Best moments ever!",
    "Tumhari dosti ne mujhe sikhaya hai ki saccha unconditional pyaar dosto mein hi milta hai.",
    "Zindagi kitni bhi mushkil kyun na ho, tumhari ek 'Main hoon na' sab theek kar deti hai.",
    "Meri bakwaas aur pagalpanti bardaasht karne ke liye thank you! You are my absolute favorite.",
    "Tumhara hona meri zindagi ki sabse pyari aadat ban chuki hai. Always stay with me!",
    "Har dukh aadha aur har khushi dugni ho jati hai jab tum mere saath hoti ho.",
    "Bhagwan se koi ek dua maangni ho, toh main har janam mein tumhe apni best friend maangunga.",
    "Zindagi ke aakhri panne tak, yeh dosti aur yeh pagalpan aise hi barkarar rahega."
  ];

  useEffect(() => {
    if (slideshowPhotos.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowPhotos, isPaused]);

  const handleDayClick = (day) => {
    if (day === 29) {
      setShowVideo(true);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowPhotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowPhotos.length) % slideshowPhotos.length);
  };

  return (
    <section className="magazine-spread-section" style={{ padding: '50px 20px 120px 20px', background: '#000', color: '#fff', overflowX: 'hidden' }}>
      <FadeInSection>
        <div className="magazine-spread-container">
          
          {/* LEFT COLUMN: Original Text and Calendar */}
          <div className="spread-left">
            <h1 className="spread-title">June ✨</h1>
            <div className="spread-divider"></div>
            
            <div className="mini-calendar">
              <div className="mc-header"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
              <div className="mc-grid">
                <span className="empty"></span><span className="empty"></span><span className="empty"></span>
                {days.map(day => (
                  <div 
                    key={day} 
                    className={`mc-day ${day === 29 ? 'mc-special' : ''}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day === 29 ? (
                      <div className="mc-heart-shape" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '180%',
                        height: '180%',
                        WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        WebkitMaskRepeat: 'no-repeat',
                        maskImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')`,
                        maskSize: 'contain',
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                        backgroundColor: '#fff',
                        zIndex: 10,
                        transition: 'transform 0.3s',
                        filter: 'drop-shadow(0px 5px 15px rgba(255, 0, 0, 0.4))'
                      }}>
                        <img 
                          src={featuredPhoto || photos[photos.length - 1]?.src} 
                          alt="29th" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} 
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255, 105, 180, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Play size={16} fill="#fff" color="#fff" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      day
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="spread-text-content" style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <p style={{ fontWeight: '400', fontSize: '1.25rem', margin: 0 }}>
                  Happy Birthday, mere sabse pyare dost! 🎉❤️
                </p>
                <AudioButton text="Happy Birthday, mere sabse pyare dost! Zindagi mein bahut log milte hain, lekin tum jaise sachche dost bahut kam hote hain. Har khushi aur mushkil mein saath dene ke liye shukriya. Dua karta hoon ki tumhari har khwahish poori ho, tum hamesha khush raho aur zindagi tumhe dher saari kamyabi aur pyaar de." size={24} />
              </div>
              <p>Zindagi mein bahut log milte hain, lekin tum jaise sachche dost bahut kam hote hain. Har khushi aur mushkil mein saath dene ke liye shukriya. Dua karta hoon ki tumhari har khwahish poori ho, tum hamesha khush raho aur zindagi tumhe dher saari kamyabi aur pyaar de.</p>
              <p>Aaj ka din tumhare liye utna hi special ho jitne tum meri zindagi mein ho. Janamdin ki bahut bahut badhai! 🥳🎂</p>
              
              <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', color: 'var(--accent-gold)' }}>
                  <Sparkles size={20} />
                  <Heart size={20} fill="var(--accent-gold)" />
                  <Sparkles size={20} />
                </div>
                <div style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: '2.5rem', color: '#fff', transform: 'rotate(-5deg)', margin: '10px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Forever Yours
                </div>
                <div style={{ fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginTop: '5px' }}>
                  A Bond That Never Fades
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The New Photo Frame Feature */}
          <div className="spread-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div className="premium-photo-frame" style={{ width: '100%', maxWidth: '450px', height: 'fit-content' }}>
              
              {/* Play/Pause Button */}
              <button 
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  position: 'absolute', top: '-15px', right: '-15px', background: '#ff1493', color: '#fff', border: 'none', borderRadius: '50%',
                  width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                  zIndex: 20, boxShadow: '0 4px 10px rgba(0,0,0,0.5)', transition: 'transform 0.2s'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title={isPaused ? "Play Slideshow" : "Pause Slideshow"}
              >
                {isPaused ? <PlayCircle size={20} /> : <Pause size={20} />}
              </button>

              <div className="frame-image-wrapper">
                {/* Navigation Arrows */}
                <button className="frame-nav-btn left" onClick={prevSlide}>
                  <ChevronLeft size={24} />
                </button>
                <button className="frame-nav-btn right" onClick={nextSlide}>
                  <ChevronRight size={24} />
                </button>

                {slideshowPhotos.map((photo, idx) => (
                  <img 
                    key={idx}
                    src={photo.src} 
                    alt={`Memory ${idx}`} 
                    className={`frame-slideshow-img ${idx === currentSlide ? 'active' : ''}`}
                  />
                ))}
              </div>
              
              <div className="frame-caption">
                <span>"{hindiQuotes[currentSlide % hindiQuotes.length]}"</span>
                <AudioButton text={hindiQuotes[currentSlide % hindiQuotes.length]} size={20} />
              </div>
              
              <div style={{ 
                position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
                width: '12px', height: '12px', borderRadius: '50%', background: '#ccc',
                boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.3)',
                zIndex: 10
              }}></div>
            </div>
          </div>

        </div>
      </FadeInSection>

      {/* Video Modal */}
      {showVideo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <video 
            src={calendarVideoSrc} 
            autoPlay 
            controls
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain', position: 'relative', zIndex: 1 }}
            onEnded={() => setShowVideo(false)}
          />
          <button 
            onClick={(e) => { e.stopPropagation(); setShowVideo(false); }} 
            style={{ position: 'absolute', top: '20px', right: '20px', background: '#ff1493', color: 'white', border: 'none', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', zIndex: 10001, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
          >
            <X size={24} />
          </button>
        </div>
      )}
    </section>
  );
};

export default MagazineSpread;
