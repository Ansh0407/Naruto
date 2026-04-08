import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap } from 'lucide-react';

export default function UIOverlay({ pwrL, pwrR }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
      {/* Top HUD */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Zap color="var(--color-naruto)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>Mode</div>
            <div style={{ fontWeight: 'bold' }}>JUTSU SENSE</div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1rem 1.5rem' }}>
          <Target color="var(--color-sasuke)" />
        </div>
      </div>

      {/* Chakra Bars */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '2rem', width: '250px' }}>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-naruto)', textShadow: '0 0 10px rgba(255,94,0,0.5)' }}>NARUTO CHAKRA</div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
          <motion.div 
            style={{ height: '100%', background: 'linear-gradient(90deg, #ff9900, #ff5e00)', width: `${pwrL * 100}%`, boxShadow: '0 0 10px #ff5e00' }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '3rem', right: '2rem', width: '250px', textAlign: 'right' }}>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-sasuke)', textShadow: '0 0 10px rgba(93,0,255,0.5)' }}>SASUKE CHAKRA</div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', display: 'flex', justifyContent: 'flex-end', border: '1px solid rgba(255,255,255,0.05)' }}>
          <motion.div 
            style={{ height: '100%', background: 'linear-gradient(270deg, #9b51e0, #5d00ff)', width: `${pwrR * 100}%`, boxShadow: '0 0 10px #5d00ff' }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}
