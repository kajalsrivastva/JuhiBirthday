import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async engine => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    await loadSlim(engine);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"] },
            links: { enable: false },
            move: {
              direction: "bottom",
              enable: true,
              outModes: { default: "out" },
              random: true,
              speed: 2,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: { value: 0.8 },
            shape: { type: ["circle", "square", "triangle"] },
            size: { value: { min: 3, max: 6 }, animation: { enable: true, minimumValue: 2, speed: 2, sync: false } },
            rotate: { animation: { enable: true, speed: 5, sync: false }, direction: "random" }
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
