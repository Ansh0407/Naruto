import React from 'react';
import { motion } from 'framer-motion';

export default function LandingScreen({ onStart }) {
  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        padding: '3rem 4rem',
        textAlign: 'center',
        zIndex: 50,
        maxWidth: '600px',
        width: '90%'
      }}
    >
      <motion.h1
        style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #ff5e00, #5d00ff)', WebkitBackgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}
      >
        JUTSU TRACKER
      </motion.h1>
      <p style={{ fontSize: '1.2rem', color: '#abb2bf', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        Experience the power of the Shinobi. Allow camera access and open your palm to unleash your chakra.
      </p>

      <button
        onClick={onStart}
        className="glow-orange"
        style={{
          background: 'var(--color-naruto)',
          color: 'white',
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: '600',
          borderRadius: '50px',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 94, 0, 0.6)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 94, 0, 0.4)';
        }}
      >
        START EXPERIENCE
      </button>
    </motion.div>
  );
}
