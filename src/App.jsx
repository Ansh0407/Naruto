import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import TrackerView from './components/TrackerView';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 🔥 Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/BG.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: 0
        }}
      />

      {/* 🔥 Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1
        }}
      />

      {/* 🔥 Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!started ? (
          <LandingScreen onStart={() => setStarted(true)} />
        ) : (
          <TrackerView />
        )}
      </div>
    </div>
  );
}