'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BoltIcon, DotsGridIcon, ExpandIcon, FlipIcon, LiveIcon, MoonIcon } from './camera/icons';

// ───────── ตั้งค่า (แก้ที่นี่) ─────────
// วางไฟล์วิดีโอไว้ที่ public/camera.mp4 (หรือเปลี่ยนชื่อ/พาธตรงนี้) วิดีโอจะเล่นวนลูปแทนภาพจากกล้อง
const VIDEO_SRC = '/camera.mp4';
// รูปวงกลมเล็กมุมซ้ายล่าง (รูปล่าสุด) — พอกดถ่ายรูป จะถูกแทนด้วยเฟรมที่ถ่ายได้
const THUMBNAIL_SRC = '/p13.jpg';

type Mode = 'VIDEO' | 'PHOTO' | 'SIRI';
const MODES: Mode[] = ['VIDEO', 'PHOTO', 'SIRI'];

const dark = '#1c1c1e';
const circle = (size = 43): CSSProperties => ({
  width: size,
  height: size,
  flexShrink: 0,
  borderRadius: '50%',
  background: dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
});

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>('PHOTO');
  const [flash, setFlash] = useState(false);
  const [live, setLive] = useState(false);
  const [night, setNight] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [full, setFull] = useState(false);
  const [thumb, setThumb] = useState(THUMBNAIL_SRC);
  const [shotFlash, setShotFlash] = useState(false);
  const [recording, setRecording] = useState(false);
  const [secs, setSecs] = useState(0);
  const [videoError, setVideoError] = useState(false);

  // นับเวลาตอนอัดวิดีโอ
  useEffect(() => {
    if (!recording) {
      setSecs(0);
      return;
    }
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const changeMode = (m: Mode) => {
    setRecording(false);
    setMode(m);
  };

  const shutter = () => {
    if (mode === 'VIDEO') {
      setRecording((r) => !r);
      return;
    }
    // ถ่ายรูป: จับเฟรมปัจจุบันของวิดีโอมาเป็นรูปล่าสุด
    const v = videoRef.current;
    if (v && v.videoWidth) {
      try {
        const c = document.createElement('canvas');
        c.width = v.videoWidth;
        c.height = v.videoHeight;
        const ctx = c.getContext('2d');
        if (ctx) {
          if (mirror) {
            ctx.translate(c.width, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(v, 0, 0);
          setThumb(c.toDataURL('image/jpeg', 0.8));
        }
      } catch {
        /* ถ้าดึงเฟรมไม่ได้ ก็แค่เอฟเฟกต์แฟลช */
      }
    }
    setShotFlash(true);
    setTimeout(() => setShotFlash(false), 130);
  };

  const viewfinder: CSSProperties = full
    ? { flex: 1, minHeight: 0, margin: '0 10px' }
    : { width: 300, aspectRatio: '3 / 4', margin: '0 auto', flexShrink: 0 };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff' }}>
      {/* แถบไอคอนด้านบน (ตอนอัดวิดีโอจะเปลี่ยนเป็นเวลา) */}
      <div style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 46 }}>
        {recording ? (
          <span style={{ padding: '4px 12px', borderRadius: 8, background: '#ff3b30', fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            {mmss(secs)}
          </span>
        ) : (
          <>
            <button type="button" aria-label="แฟลช" onClick={() => setFlash((v) => !v)} style={{ display: 'flex' }}><BoltIcon on={flash} /></button>
            <button type="button" aria-label="Live" onClick={() => setLive((v) => !v)} style={{ display: 'flex' }}><LiveIcon on={live} /></button>
            <button type="button" aria-label="โหมดกลางคืน" onClick={() => setNight((v) => !v)} style={{ display: 'flex' }}><MoonIcon on={night} /></button>
          </>
        )}
      </div>

      {/* ช่องมองภาพ: วิดีโอวนลูป + เส้นกริด */}
      <div style={{ ...viewfinder, position: 'relative', overflow: 'hidden', background: '#111' }}>
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: mirror ? 'scaleX(-1)' : undefined, filter: night ? 'brightness(1.25) contrast(0.95)' : undefined }}
        />

        {videoError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', fontSize: 13, color: '#8e8e93' }}>
            ไม่พบไฟล์วิดีโอ — วางไฟล์ไว้ที่ public{VIDEO_SRC}
          </div>
        )}

        {/* กริด 3x3 */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        {shotFlash && <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />}

        {/* ปุ่มขยาย/ย่อช่องมองภาพ */}
        <button
          type="button"
          aria-label="ขยาย"
          onClick={() => setFull((f) => !f)}
          style={{ ...circle(34), position: 'absolute', left: '50%', bottom: 10, transform: 'translateX(-50%)', background: 'rgba(30,30,30,0.7)' }}
        >
          <ExpandIcon />
        </button>
      </div>

      {/* แถวชัตเตอร์ */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px 10px' }}>
        <button type="button" aria-label="ฟิลเตอร์" style={{ ...circle(), fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: 22 }}>ƒ</button>

        <button
          type="button"
          aria-label={mode === 'VIDEO' ? 'อัดวิดีโอ' : 'ถ่ายรูป'}
          onClick={shutter}
          style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #7a7a7e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span
            style={{
              width: mode === 'VIDEO' && recording ? 28 : 56,
              height: mode === 'VIDEO' && recording ? 28 : 56,
              borderRadius: mode === 'VIDEO' && recording ? 7 : '50%',
              background: mode === 'VIDEO' ? '#ff3b30' : '#fff',
              transition: 'all .15s',
            }}
          />
        </button>

        <button type="button" aria-label="ตัวเลือก" style={circle()}><DotsGridIcon /></button>
      </div>

      {/* แถวล่าง: รูปล่าสุด / โหมด / สลับกล้อง */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 24px 28px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="รูปล่าสุด" style={{ width: 43, height: 43, borderRadius: '50%', objectFit: 'cover', border: '2px solid #3a3a3c', flexShrink: 0 }} />

        <div style={{ flex: 1, height: 43, borderRadius: 22, background: dark, display: 'flex', alignItems: 'center', padding: 3 }}>
          {MODES.map((m) => {
            const active = m === mode;
            return (
              <button
                key={m}
                type="button"
                onClick={() => changeMode(m)}
                style={{
                  flex: 1,
                  height: '100%',
                  borderRadius: 19,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: 0.4,
                  background: active ? '#2c2c2e' : 'transparent',
                  border: active ? '1px solid #4a4a4d' : '1px solid transparent',
                  color: active ? (m === 'VIDEO' ? '#ff453a' : '#ffd60a') : m === 'SIRI' ? '#b9aaaa' : '#8e8e93',
                }}
              >
                {m}
              </button>
            );
          })}
        </div>

        <button type="button" aria-label="สลับกล้อง" onClick={() => setMirror((v) => !v)} style={circle()}><FlipIcon /></button>
      </div>
    </div>
  );
}
