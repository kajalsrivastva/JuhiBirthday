import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioButton = ({ text, size = 18 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      // Cleanup on unmount
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeak = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any currently playing
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Default to Hindi
      utterance.rate = 0.9;
      
      const hindiVoice = voices.find(v => v.lang.includes('hi-IN') && v.name.toLowerCase().includes('female')) || voices.find(v => v.lang.includes('hi-IN'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSpeak}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 105, 180, 0.3)',
        borderRadius: '50%',
        color: isPlaying ? 'var(--accent-gold)' : 'var(--text-secondary)',
        cursor: 'pointer',
        padding: '5px',
        marginLeft: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        transition: 'all 0.3s ease',
        transform: isPlaying ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isPlaying ? '0 0 10px rgba(255, 105, 180, 0.5)' : 'none'
      }}
      title="Listen to text"
    >
      {isPlaying ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  );
};

export default AudioButton;
