import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import TrackerView from './components/TrackerView';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-gradient)', position: 'relative' }}>
      {!started ? (
        <LandingScreen onStart={() => setStarted(true)} />
      ) : (
        <TrackerView />
      )}
    </div>
  );
}
