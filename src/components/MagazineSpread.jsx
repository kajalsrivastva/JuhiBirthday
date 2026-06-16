import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import { Heart, Sparkles, Play } from 'lucide-react';

const MagazineSpread = ({ photos, calendarVideoSrc, featuredPhoto }) => {
  const [showVideo, setShowVideo] = useState(false);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const hindiQuotes = [
    "Har kahani mein ek khaas kirdar hota hai, meri zindagi mein woh Juhi hai.",
    "Kuch log kismat se milte hain aur zindagi ko khoobsurat bana dete hain.",
    "Juhi ke saath bitaya hua har pal ek yaad nahi, ek ehsaas hai.",
    "Dosti ki asli pehchaan bharose aur saath mein hoti hai.",
    "Na har baat kehni padti hai, na har jazbaat samjhana padta hai.",
    "Meri dua hai ki meri aur Juhi ki dosti hamesha yun hi muskurati rahe.",
    "Best friend woh hota hai jo har khushi ko dugna kar de.",
    "Dosti khoon ke rishte se nahi, dil ke rishte se banti hai.",
    "Ek sachcha dost hazaar rishton se zyada kimati hota hai.",
    "Best friend ke saath bita hua har pal khoobsurat kitaab ban jaata hai.",
    "Jahan duniya saath chhod de, wahan ek saccha dost haath thaam leta hai.",
    "Dost woh hai jo dard mein sabse pehle nazar aaye.",
    "Zindagi ki sabse badi daulat ek wafadar aur sachcha dost hota hai.",
    "Har kisi ko ek aisa dost zaroor milna chahiye jo bina kahe baat samajh le.",
    "Best friends kabhi perfect nahi hote, lekin unki dosti perfect lagti hai.",
    "Sachi dosti waqt ke saath aur gehri hoti chali jaati hai."
  ];

  // The 29th gets a special click handler
  const handleDayClick = (day) => {
    if (day === 29) {
      setShowVideo(true);
    }
  };

  return (
    <section className="magazine-spread-section" style={{ padding: '50px 20px', background: '#000', color: '#fff' }}>
      <FadeInSection>
        <div className="magazine-spread-container">
          
          {/* LEFT COLUMN: Text and Calendar */}
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
                        backgroundColor: '#fff', /* Fallback */
                        zIndex: 10,
                        transition: 'transform 0.3s',
                        filter: 'drop-shadow(0px 5px 15px rgba(255, 0, 0, 0.4))'
                      }}>
                        <img 
                          src={featuredPhoto || photos[photos.length - 1]?.src} 
                          alt="29th" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center top' // Prevent face cutoff
                          }} 
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

            <div className="spread-text-content">
              <p style={{ fontWeight: '400', fontSize: '1.25rem', marginBottom: '15px' }}>
                Happy Birthday, mere sabse pyare dost! 🎉❤️
              </p>
              <p>
                Zindagi mein bahut log milte hain, lekin tum jaise sachche dost bahut kam hote hain. Har khushi aur mushkil mein saath dene ke liye shukriya. Dua karta hoon ki tumhari har khwahish poori ho, tum hamesha khush raho aur zindagi tumhe dher saari kamyabi aur pyaar de.
              </p>
              <p>
                Aaj ka din tumhare liye utna hi special ho jitne tum meri zindagi mein ho. Janamdin ki bahut bahut badhai! 🥳🎂
              </p>
              
              <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', color: 'var(--accent-gold)' }}>
                  <Sparkles size={20} />
                  <Heart size={20} fill="var(--accent-gold)" />
                  <Sparkles size={20} />
                </div>
                <div style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: '2.5rem', color: '#fff', transform: 'rotate(-5deg)', marginTop: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Forever Yours
                </div>
                <div style={{ fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginTop: '5px' }}>
                  A Bond That Never Fades
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Photo Masonry */}
          <div className="spread-right">
            <div className="spread-masonry">
              {photos.slice(15, 31).map((photo, idx) => (
                <div key={idx} className="spread-photo-wrapper" style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  background: 'white',
                  padding: '10px 10px 20px 10px',
                  borderRadius: '4px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                }}>
                  <img src={photo.src} alt={`Collage ${idx}`} style={{ 
                    borderRadius: '2px', 
                    width: '100%', 
                    aspectRatio: '4/5', 
                    objectFit: 'contain' 
                  }} />
                  <div className="spread-photo-caption" style={{
                    marginTop: '15px',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    color: '#222',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    "{hindiQuotes[idx % hindiQuotes.length]}"
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </FadeInSection>

      {/* Video Modal for 29th */}
      {showVideo && calendarVideoSrc && (
        <div className="modal-overlay" onClick={() => setShowVideo(false)} style={{ zIndex: 100000 }}>
          <button className="modal-close" onClick={() => setShowVideo(false)}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'transparent', boxShadow: 'none' }}>
            <video 
              src={calendarVideoSrc} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block', borderRadius: '8px' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MagazineSpread;
