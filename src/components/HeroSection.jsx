import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [balloons, setBalloons] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "To my amazing best friend.",
    "The one who knows all my secrets...",
    "The most beautiful soul I know!",
    "Thank you for always being there.",
    "Let's make this day unforgettable!"
  ];

  const floatingPhotos = [
    "/juhi_media/IMG-20240804-WA0155.jpg",
    "/juhi_media/IMG_20250825_160317.jpg",
    "/juhi_media/IMG_20260302_161934.jpg"
  ];

  useEffect(() => {
    // Generate some random balloons
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `${Math.random() * 5}s`,
      scale: 0.5 + Math.random() * 0.8,
      color: Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--accent-purple)'
    }));
    setBalloons(newBalloons);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('memory-lane');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="balloons-container">
        {balloons.map((b) => (
          <div
            key={b.id}
            className="balloon"
            style={{
              left: b.left,
              animationDuration: b.animationDuration,
              animationDelay: b.animationDelay,
              transform: `scale(${b.scale})`,
              backgroundColor: b.color,
            }}
          />
        ))}
        {floatingPhotos.map((photo, i) => (
          <div 
            key={`photo-${i}`}
            className="floating-photo"
            style={{
              left: `${15 + i * 30}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <img src={photo} alt="Memory" />
          </div>
        ))}
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Happy Birthday!</h1>
        <p key={messageIndex} className="hero-subtitle fade-in-out-message">
          {messages[messageIndex]}
        </p>
        <button className="hero-button" onClick={scrollToNext}>
          Let's Celebrate 🎉
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
