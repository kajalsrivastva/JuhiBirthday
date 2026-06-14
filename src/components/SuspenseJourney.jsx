import React, { useState, useEffect } from 'react';

const SuspenseJourney = ({ onFinish, onStartMusic }) => {
  const [step, setStep] = useState(0);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const suspenseTexts = [
    "Access Granted...",
    "Target Identified: JUHI ❤️",
    "Tumhe kya laga, main tumhara birthday bhool jaungi?",
    "Aaj ek bohot special din hai...",
    "Kyunki aaj is duniya ki sabse pyari ladki ka janamdin hai...",
    "Are you ready for the magic, Juhi?",
    "Let the journey begin..."
  ];

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'bestie') {
      onStartMusic(); // Start "Jeene Laga Hoon" right now!
      setStep(1); // Move to typewriter
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  useEffect(() => {
    if (step === 1) {
      if (textIndex < suspenseTexts.length) {
        const timer = setTimeout(() => {
          setTextIndex(prev => prev + 1);
        }, 5000); // Wait 5s per text (Slowed down for reading)
        return () => clearTimeout(timer);
      } else {
        setStep(2); // Move to countdown
      }
    }
  }, [step, textIndex]);

  const [count, setCount] = useState(5);
  useEffect(() => {
    if (step === 2) {
      if (count > 0) {
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        onFinish(); // Reveal the gift box!
      }
    }
  }, [step, count, onFinish]);

  return (
    <div className="suspense-wrapper">
      {step === 0 && (
        <div className="terminal-container">
          <p className="terminal-line typing">SYSTEM_OVERRIDE_INITIATED...</p>
          <p className="terminal-line typing delay-1">SEARCHING_FOR_BIRTHDAY_GIRL...</p>
          <p className="terminal-line typing delay-2">ENTER SECRET PASSCODE TO UNLOCK SURPRISES:</p>
          
          <form onSubmit={handlePasscodeSubmit} className="passcode-form delay-3">
            <input 
              type="text" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={`passcode-input ${error ? 'shake-error' : ''}`}
              placeholder="Hint: Your favorite word"
              autoFocus
            />
            {error && <p className="error-text">ACCESS DENIED. TRY AGAIN.</p>}
          </form>
        </div>
      )}

      {step === 1 && (
        <div className="typewriter-container">
          <h2 key={textIndex} className="mysterious-text fade-in-out" style={{ color: textIndex === 1 ? 'var(--accent-color)' : '#fff' }}>
            {suspenseTexts[textIndex]}
          </h2>
        </div>
      )}

      {step === 2 && (
        <div className="countdown-container">
          <h1 className="countdown-number pulse-fast">{count}</h1>
        </div>
      )}
    </div>
  );
};

export default SuspenseJourney;
