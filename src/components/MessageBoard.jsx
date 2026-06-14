import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const MessageBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      title: "Dearest Friend,",
      text: "Happy Birthday! 🎉 You mean the world to me. Thank you for always being there, for the endless laughs, and for all the unforgettable memories.",
      author: "With all my love, Your Bestie ❤️",
      photo: "/juhi_media/IMG-20240804-WA0173.jpg"
    },
    {
      title: "To My Partner in Crime,",
      text: "From crazy late-night talks to making the best memories, life is so much better with you in it. Keep shining always!",
      author: "Yours forever ✨",
      photo: "/juhi_media/IMG-20240804-WA0183.jpg"
    },
    {
      title: "My Beautiful Juhi,",
      text: "May this year bring you all the happiness, success, and love you deserve. Duniya ki sabse pyari ladki ko janamdin mubarak!",
      author: "Love you endless 💕",
      photo: "/juhi_media/IMG-20240804-WA0189.jpg"
    }
  ];

  return (
    <section className="message-board section-container">
      <h2 className="section-title">Special Letters For You</h2>
      <p className="section-subtitle">Click the envelope to open your letters 💌</p>
      
      {!isOpen ? (
        <div className="envelope-container" onClick={() => setIsOpen(true)}>
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="envelope-seal">
                <Heart fill="var(--accent-color)" color="var(--accent-color)" size={30} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="messages-grid fade-in-out-puzzle" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className="message-card-new" style={{ background: '#fff', borderRadius: '15px', padding: '20px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transform: `rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})`, transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})`}>
              <div style={{ width: '100%', height: '250px', background: '#f5f5f5', borderRadius: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img src={msg.photo} alt="Memory" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{fontFamily: 'var(--font-heading)', color: 'var(--accent-purple)', marginBottom: '10px'}}>{msg.title}</h3>
              <p style={{ lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>{msg.text}</p>
              <p style={{ fontWeight: 'bold', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>{msg.author}</p>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div style={{textAlign: 'center', marginTop: '40px', animation: 'fade-in 2s'}}>
          <p style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>Scroll down for more...</p>
        </div>
      )}
    </section>
  );
};

export default MessageBoard;
