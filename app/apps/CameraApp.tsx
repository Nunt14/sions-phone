'use client';
import { useEffect, useRef, useState } from 'react';

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<'user' | 'environment'>('environment');
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
        streamRef.current?.getTracks().forEach((t) => t.stop());
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
        if (cancelled) return stream.getTracks().forEach((t) => t.stop());
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setError(null);
      } catch {
        setError('ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตการใช้กล้องในเบราว์เซอร์');
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [facing]);

  const shoot = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d')?.drawImage(v, 0, 0);
    setLast(c.toDataURL('image/jpeg', 0.8));
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black text-white">
      <div className="relative flex-1 min-h-0 rounded-[18px] overflow-hidden mx-1 bg-zinc-900">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${facing === 'user' ? '-scale-x-100' : ''}`}
        />
        {error && <div className="absolute inset-0 flex items-center justify-center text-center text-sm text-zinc-400 px-8">{error}</div>}
        {flash && <div className="absolute inset-0 bg-white" />}
      </div>

      <div className="shrink-0 pt-3 pb-9 px-8">
        <div className="text-center text-[13px] font-semibold text-[#ffd60a] mb-4">PHOTO</div>
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {last && <img src={last} alt="last shot" className="w-full h-full object-cover" />}
          </div>
          <button onClick={shoot} aria-label="ถ่ายรูป" className="w-[72px] h-[72px] rounded-full border-[4px] border-white flex items-center justify-center active:scale-95 transition-transform">
            <span className="w-[58px] h-[58px] rounded-full bg-white active:bg-zinc-300" />
          </button>
          <button
            onClick={() => setFacing((f) => (f === 'user' ? 'environment' : 'user'))}
            aria-label="สลับกล้อง"
            className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl active:scale-90 transition-transform"
          >
            ⟲
          </button>
        </div>
      </div>
    </div>
  );
}
