import React, { useEffect, useRef, useState } from 'react';
import UIOverlay from './UIOverlay';

export default function TrackerView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const nRef = useRef(null);
  const sRef = useRef(null);

  const [pwrTracker, setPwrTracker] = useState({ L: 0, R: 0 });

  useEffect(() => {
    const vElement = videoRef.current;
    const cElement = canvasRef.current;
    if (!vElement || !cElement) return;

    const ctx = cElement.getContext('2d');
    const n = nRef.current;
    const s = sRef.current;

    let pwr = [0, 0];
    let wasOpen = [false, false];
    let lastRenderTime = 0;

    function checkOpen(pts) {
      let count = 0;
      const wrist = pts[0];
      const tips = [8, 12, 16, 20];
      const pips = [6, 10, 14, 18];
      for (let i = 0; i < tips.length; i++) {
        const tip = pts[tips[i]];
        const pip = pts[pips[i]];
        if (Math.hypot(tip.x - wrist.x, tip.y - wrist.y) > Math.hypot(pip.x - wrist.x, pip.y - wrist.y)) count++;
      }
      return count >= 3;
    }

    function onResults(res) {
      cElement.width = vElement.videoWidth;
      cElement.height = vElement.videoHeight;
      ctx.save();
      ctx.clearRect(0, 0, cElement.width, cElement.height);

      let fL = false;
      let fR = false;

      n.style.display = 'none';
      s.style.display = 'none';

      if (res.multiHandLandmarks && res.multiHandedness) {
        res.multiHandLandmarks.forEach((pts, i) => {
          const label = res.multiHandedness[i].label;
          const isR = label === 'Right';
          const idx = isR ? 1 : 0;

          // Skeleton Overlay
          ctx.save();
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00fbff';
          if(window.drawConnectors) window.drawConnectors(ctx, pts, window.HAND_CONNECTIONS, { color: '#00d4ff', lineWidth: 3 });
          if(window.drawLandmarks) window.drawLandmarks(ctx, pts, { color: '#ffffff', lineWidth: 1, radius: 2 });
          ctx.restore();

          const open = checkOpen(pts);
          pwr[idx] += open ? 0.05 : -0.15;
          pwr[idx] = Math.max(0, Math.min(1, pwr[idx]));

          if (open && !wasOpen[idx]) {
            const vid = isR ? s : n;
            vid.currentTime = 0;
            vid.play().catch(() => {});
          }
          wasOpen[idx] = open;

          const wrist = pts[0];
          const knk = pts[9];

          if (pwr[idx] > 0.01) {
            if (isR) {
              fR = true;
              const tx = (wrist.x + knk.x) / 2;
              const ty = (wrist.y + knk.y) / 2;
              s.style.left = `${(1 - tx) * window.innerWidth}px`;
              s.style.top = `${ty * window.innerHeight}px`;
              s.style.display = 'block';
              s.style.opacity = pwr[idx];
            } else {
              fL = true;
              const dx = knk.x - wrist.x;
              const dy = knk.y - wrist.y;
              const tx = knk.x + (dx * 0.8);
              const ty = knk.y + (dy * 0.8);
              n.style.left = `${(1 - tx) * window.innerWidth}px`;
              n.style.top = `${(ty * window.innerHeight) - 120}px`;
              n.style.display = 'block';
              n.style.opacity = pwr[idx];
            }
          }
        });
      }

      if (!fL) {
        pwr[0] = Math.max(0, pwr[0] - 0.15);
        if (pwr[0] > 0.01) { n.style.display = 'block'; n.style.opacity = pwr[0]; }
        wasOpen[0] = false;
      }
      if (!fR) {
        pwr[1] = Math.max(0, pwr[1] - 0.15);
        if (pwr[1] > 0.01) { s.style.display = 'block'; s.style.opacity = pwr[1]; }
        wasOpen[1] = false;
      }
      
      const now = performance.now();
      if (now - lastRenderTime > 100) {
        setPwrTracker({ L: pwr[0], R: pwr[1] });
        lastRenderTime = now;
      }
      
      ctx.restore();
    }

    if (!window.Hands) return; // safeguard

    const h = new window.Hands({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
    });

    h.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.65,
      minTrackingConfidence: 0.65
    });

    h.onResults(onResults);

    let cam;
    if (window.Camera) {
      cam = new window.Camera(vElement, {
        onFrame: async () => { await h.send({ image: vElement }); },
        width: 1280, height: 720
      });
      setTimeout(() => {
          cam.start();
      }, 500);
    }

    return () => {
      if (cam && cam.stop) { cam.stop(); }
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', transform: 'scaleX(-1)' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', transform: 'scaleX(-1)', zIndex: 2, pointerEvents: 'none' }} />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(10, 5, 0, 0.4)', mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5 }} />

      <video ref={nRef} src="/assets/naruto.mp4" muted autoPlay loop playsInline style={{ position: 'absolute', width: '1600px', height: 'auto', left: 0, top: 0, transform: 'translate(-50%, -50%)', pointerEvents: 'none', display: 'none', mixBlendMode: 'screen', zIndex: 20 }} />
      <video ref={sRef} src="/assets/sasuke.mp4" muted autoPlay loop playsInline style={{ position: 'absolute', width: '2400px', height: 'auto', left: 0, top: 0, transform: 'translate(-50%, -50%)', pointerEvents: 'none', display: 'none', mixBlendMode: 'screen', zIndex: 20 }} />

      <UIOverlay pwrL={pwrTracker.L} pwrR={pwrTracker.R} />
    </div>
  );
}
