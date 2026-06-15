import React, { useRef, useEffect, useState } from 'react';

const ScratchCard = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isScratched) return;
    
    // We use a timeout to ensure CSS has applied and container has dimensions
    const initCanvas = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0) {
        setTimeout(initCanvas, 100);
        return;
      }
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#2a2a2a');
      gradient.addColorStop(1, '#0a0a0c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = 'italic 20px "Playfair Display", serif';
      ctx.fillStyle = '#d4af37';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2);
      
      setIsReady(true);
    };

    initCanvas();
  }, [isScratched]);

  useEffect(() => {
    if (!isReady || isScratched) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;

    const scratch = (e) => {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault(); // crucial for touch devices
      
      const rect = canvas.getBoundingClientRect();
      const isTouch = e.type.startsWith('touch');
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleDown = (e) => { isDrawing = true; scratch(e); };
    const handleUp = () => { 
      isDrawing = false; 
      if (!isScratched) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < imgData.data.length; i += 4) {
          if (imgData.data[i] === 0) transparent++;
        }
        if (transparent / (canvas.width * canvas.height) > 0.4) {
          setIsScratched(true);
        }
      }
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', handleUp);
    
    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isReady, isScratched]);

  return (
    <div ref={containerRef} style={{ 
      position: 'relative', width: '100%', maxWidth: '300px', aspectRatio: '3/4', margin: '20px auto', 
      borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0 2px rgba(212,175,55,0.3)', backgroundColor: '#000'
    }}>
      <img src={imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Surprise" />
      <canvas 
        ref={canvasRef}
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          opacity: isScratched ? 0 : 1, transition: 'opacity 1.5s ease', pointerEvents: isScratched ? 'none' : 'auto', cursor: 'crosshair', touchAction: 'none'
        }}
      />
    </div>
  );
};

export default ScratchCard;
